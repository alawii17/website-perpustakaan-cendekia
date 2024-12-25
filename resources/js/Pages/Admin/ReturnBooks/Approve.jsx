import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Textarea } from "@/Components/ui/textarea";
import { flashMessage } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { IconChecklist } from "@tabler/icons-react";
import { Label } from "recharts";
import { toast } from "sonner";

export default function Approve({conditions , action}) 
{
    const { data, setData, put, errors, processing } = useForm({
        condition: null,
        notes: '',
        _method: 'PUT',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        })
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='green' size='sm'>
                    <IconChecklist className="size-4 text-white" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Konfirmasi Kondisi Buku</SheetTitle>
                    <SheetDescription>Periksa kondisi buku sesuai dengan buku yang dikembalikan oleh member</SheetDescription>
                </SheetHeader>
                <form className="mt-6 space-y-4" onSubmit={onHandleSubmit}>
                    <div className="grid w-full items-center gap-1/5">
                        <Label htmlFor="condition">Kondisi Buku</Label>
                        <Select
                            defaultValue={data.condition} 
                            onValueChange={(value) => setData('condition', value)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {conditions.find((condition) => condition.value == data.condition)?.label ?? 'Pilih Kondisi Buku'}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {conditions.map((condition, index) => (
                                    <SelectItem key={index} value={condition.value}>
                                        {condition.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.condition && (
                            <InputError message={errors.condition} />
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1/5">
                        <Label htmlFor="condition">Kondisi Buku</Label>
                        <Textarea
                            name="notes"
                            id="notes"
                            type="text"
                            onChange={(e) => setData(e.target.name, e.target.value)}
                            placeholder="Masukkan catatan"
                            value={data.notes}
                        >

                        </Textarea>
                        {errors.notes && (
                            <InputError message={errors.notes} />
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="orange"
                            disabled={processing}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}