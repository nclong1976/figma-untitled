import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, Badge, inputCls, ConfirmDialog } from "../ui";

const STATUS = ["pending", "processing", "completed", "rejected"];

export default function Transactions() {
  const { toast } = useToast();
  const [txs, setTxs] = useState([]);
  const [fStatus, setFStatus] = useState("all");
  const [fType, setFType] = useState("all");
  const [confirm, setConfirm] = useState(null);

  const load = () => base44.entities.Transaction.list("-created_date").then(setTxs).catch(() => {});
  useEffect(() => { load(); }, []);

  const rows = useMemo(() => txs.filter((t) => {
    if (fStatus !== "all" && t.status !== fStatus) return false;
    if (fType !== "all" && t.type !== fType) return false;
    return true;
  }), [txs, fStatus, fType]);

  const decide = async () => {
    if (!confirm) return;
    try { await base44.entities.Transaction.update(confirm.tx.id, { status: confirm.status }); toast({ title: confirm.status === "completed" ? "Đã duyệt" : "Đã từ chối" }); setConfirm(null); load(); }
    catch { toast({ title: "Lỗi", variant: "destructive" }); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Quản lý giao dịch</h1>
      <Panel className="p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select className={inputCls} value={fType} onChange={(e) => setFType(e.target.value)}><option value="all" className="bg-[#161936]">Tất cả loại</option><option value="deposit" className="bg-[#161936]">Nạp</option><option value="withdraw" className="bg-[#161936]">Rút</option></select>
          <select className={inputCls} value={fStatus} onChange={(e) => setFStatus(e.target.value)}><option value="all" className="bg-[#161936]">Tất cả trạng thái</option>{STATUS.map((s) => <option key={s} value={s} className="bg-[#161936]">{s}</option>)}</select>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <TableWrap>
          <thead className="bg-white/[0.03]"><tr><Th>Người dùng</Th><Th>Loại</Th><Th>Số tiền</Th><Th>Phương thức</Th><Th>Trạng thái</Th><Th>Thời gian</Th><Th className="text-right">Hành động</Th></tr></thead>
          <tbody>
            {rows.length === 0 ? <Empty colSpan={7} /> : rows.map((t) => (
              <tr key={t.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <Td>{t.userEmail}</Td>
                <Td><Badge tone={t.type === "deposit" ? "green" : "amber"}>{t.type === "deposit" ? "Nạp" : "Rút"}</Badge></Td>
                <Td>{t.amount} coin</Td>
                <Td className="text-white/70">{t.method}</Td>
                <Td><Badge tone={t.status === "completed" ? "green" : t.status === "rejected" ? "red" : t.status === "processing" ? "blue" : "amber"}>{t.status}</Badge></Td>
                <Td className="text-white/50 text-[12px]">{new Date(t.created_date).toLocaleString("vi-VN")}</Td>
                <Td>{t.status === "pending" && t.type === "withdraw" ? (
                  <div className="flex justify-end gap-1">
                    <button className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300" onClick={() => setConfirm({ tx: t, status: "completed" })} title="Duyệt"><Check size={16} /></button>
                    <button className="p-1.5 rounded-lg bg-red-500/20 text-red-300" onClick={() => setConfirm({ tx: t, status: "rejected" })} title="Từ chối"><X size={16} /></button>
                  </div>
                ) : <span className="text-white/30">—</span>}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(v) => !v && setConfirm(null)}
        title={confirm?.status === "completed" ? "Duyệt rút tiền" : "Từ chối rút tiền"}
        desc={`${confirm?.tx?.userEmail} · ${confirm?.tx?.amount} coin`}
        confirmText={confirm?.status === "completed" ? "Duyệt" : "Từ chối"}
        tone={confirm?.status === "completed" ? "primary" : "danger"}
        onConfirm={decide}
      />
    </div>
  );
}