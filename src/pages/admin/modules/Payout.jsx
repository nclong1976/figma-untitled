import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Panel, TableWrap, Th, Td, Empty, inputCls } from "../ui";
import { Percent, Save } from "lucide-react";

export default function Payout() {
  const { toast } = useToast();
  const [rows, setRows] = useState([]);
  const [draft, setDraft] = useState({});

  const load = () => base44.entities.PayoutSetting.list().then(setRows).catch(() => {});
  useEffect(() => {
    load();
    const unsub = base44.entities.PayoutSetting.subscribe(() => load());
    return () => unsub && unsub();
  }, []);

  const save = async (r) => {
    const v = Number(draft[r.id]);
    if (!v || v <= 0) return toast({ title: "Nhập hệ số hợp lệ (>0)", variant: "destructive" });
    try {
      await base44.entities.PayoutSetting.update(r.id, { multiplier: v });
      toast({ title: "Đã cập nhật tỷ lệ trả thưởng", description: `${r.gameName}: x${v}` });
    } catch (e) { toast({ title: "Lỗi", description: e.message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Percent className="w-5 h-5 text-[#ffab40]" />
        <h1 className="text-xl font-bold">Tỷ lệ trả thưởng</h1>
      </div>
      <p className="text-sm text-white/50 -mt-2">Hệ số nhân áp dụng lên toàn bộ kèo của từng trò chơi (mặc định x1.0). Thay đổi áp dụng ngay cho mọi ván cược.</p>
      <Panel className="overflow-hidden">
        <TableWrap>
          <thead className="bg-white/[0.03]"><tr><Th>Trò chơi</Th><Th>Mã</Th><Th>Hệ số trả thưởng</Th><Th className="text-right">Hành động</Th></tr></thead>
          <tbody>
            {rows.length === 0 ? <Empty colSpan={4} /> : rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <Td><span className="font-medium text-white">{r.gameName}</span></Td>
                <Td><code className="text-white/50 text-xs">{r.gameId}</code></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <input type="number" step="0.01" min="0.01" defaultValue={r.multiplier ?? 1}
                      onChange={(e) => setDraft((d) => ({ ...d, [r.id]: e.target.value }))}
                      className={`${inputCls} w-28`} />
                    <span className="text-white/40 text-sm">x</span>
                  </div>
                </Td>
                <Td className="text-right">
                  <button onClick={() => save(r)} className="h-8 px-3 rounded-lg bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white text-xs inline-flex items-center gap-1"><Save size={14} /> Lưu</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </div>
  );
}