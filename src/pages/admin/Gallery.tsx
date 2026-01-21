import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
    Loader2,
    ImageIcon,
    LayoutGrid,
    UploadCloud,
    Pencil,
    Trash2,
    Info,
} from "lucide-react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// CSS Plugin
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// REGISTER PLUGIN (Wajib panggil ini agar prop dikenal secara runtime)
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    old_original_url: string;
    original_url: string;
    thumbnail_url: string;
    old_thumbnail_url: string;
    file_name: string;
    file_url: string;
    file_size: number;
}

const Gallery = () => {
    // --- States ---
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("list");
    
    // Form Upload State
    const [files, setFiles] = useState<any[]>([]);
    const [uploadData, setUploadData] = useState({ title: "", description: "" });
    const [isUploading, setIsUploading] = useState(false);

    // Edit/Detail State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editFormData, setEditFormData] = useState<GalleryItem | null>(null);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [editFile, setEditFile] = useState<any[]>([]);
    const [isUploadingEdit, setIsUploadingEdit] = useState(false);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:7654";
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetchGallery();
    }, []);

    // --- Actions ---
    const resetStates = () => {
        setEditFormData(null);
        setSelectedItem(null);
        setEditFile([]);
    };
    const fetchGallery = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiBaseUrl}/api/gallery/search`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            setItems(Array.isArray(result.data) ? result.data : []);
            console.log("Status:", res.status);
        } catch (err) {
            toast.error("Gagal memuat galeri");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = async (id: number) => {
        setIsEditOpen(true);
        setIsDetailLoading(true);
        setEditFile([]); // Reset upload slot
        try {
            const response = await fetch(`${apiBaseUrl}/api/gallery/${id}`);
            const result = await response.json();
            if (result?.data) {
                setEditFormData(result.data);
                setSelectedItem(result.data);
            }
        } catch (err) {
            toast.error("Gagal mengambil detail");
            setIsEditOpen(false);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleUpdateImage = async () => {
        if (!editFile.length || !selectedItem) return toast.error("Pilih file baru");

        setIsUploadingEdit(true);
        const formData = new FormData();
        formData.append("file", editFile[0].file);

        try {
            const response = await fetch(`${apiBaseUrl}/api/gallery/${selectedItem.id}/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) throw new Error();
            if (editFormData) {
                console.log("res: ", result)
                setEditFormData({
                    ...editFormData,
                    original_url: result.object_key,
                    thumbnail_url: result.object_key,
                    file_name: result.file_name,
                });
            }
            toast.success("Gambar diupload! Preview akan terupdate setelah disimpan.");
        } catch (err) {
            toast.error("Gagal upload gambar");
        } finally {
            setIsUploadingEdit(false);
        }
    };

    const handleSaveAllChanges = async () => {
        console.log("formdata: ", editFormData)
        if (!selectedItem) return;
        try {
            const response = await fetch(`${apiBaseUrl}/api/gallery/${selectedItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editFormData),
            });

            if (!response.ok) throw new Error();

            toast.success("Data berhasil diperbarui");
            setIsEditOpen(false);
            resetStates();
            fetchGallery();
        } catch (err) {
            toast.error("Gagal menyimpan perubahan");
        }
    };

    const handleUpload = async () => {
        if (!files.length) return toast.error("Pilih file");
        setIsUploading(true);
        const formData = new FormData();
        formData.append("title", uploadData.title);
        formData.append("description", uploadData.description);
        files.forEach(f => formData.append("files", f.file));

        try {
            const response = await fetch(`${apiBaseUrl}/api/gallery/uploads`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (!response.ok) throw new Error();
            toast.success("Berhasil diposting!");
            setFiles([]);
            setUploadData({ title: "", description: "" });
            setActiveTab("list");
            fetchGallery();
        } catch (err) {
            toast.error("Gagal upload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus media ini?")) return;
        try {
            const response = await fetch(`${apiBaseUrl}/api/gallery/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                toast.success("Terhapus");
                setItems(prev => prev.filter(i => i.id !== id));
            }
        } catch (err) {
            toast.error("Gagal menghapus");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-bold text-[#00365c] uppercase tracking-[0.2em] opacity-60">Visual Assets</h2>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gallery Management</h1>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-slate-100 p-1 rounded-2xl h-14 mb-8">
                    <TabsTrigger value="list" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-[#00365c] data-[state=active]:!text-white">
                        <LayoutGrid className="mr-2 h-4 w-4" /> All Moments
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-[#00365c] data-[state=active]:!text-white">
                        <UploadCloud className="mr-2 h-4 w-4" /> Add New Media
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="mt-0 outline-none">
                    {loading ? (
                        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#00365c]" size={40} /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <Card key={item.id} className="group border-none shadow-sm bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-500">
                                    <div className="relative h-64 overflow-hidden bg-slate-100">
                                        <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 rounded-xl" onClick={() => handleEditClick(item.id)}><Pencil size={16} /> Edit</Button>
                                            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-xl" onClick={() => handleDelete(item.id)}><Trash2 size={16} /> Hapus</Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-5 text-center">
                                        <h3 className="font-bold text-slate-900 truncate uppercase text-sm">{item.title}</h3>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* MODAL EDIT */}
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogContent 
                            onPointerDownOutside={(e) => e.preventDefault()}
                            className="!max-w-4xl w-[95%] max-h-[90vh] flex flex-col rounded-[2.5rem] p-0 border-none shadow-2xl overflow-hidden"
                        >
                            <DialogHeader className="p-8 bg-[#00365c] text-white shrink-0">
                                <DialogTitle className="text-2xl font-black italic uppercase">Media Details</DialogTitle>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                {isDetailLoading ? (
                                    <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#00365c]" size={32} /></div>
                                ) : selectedItem && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase text-slate-400 block text-center">Current Image</Label>
                                                <div className="rounded-[2rem] overflow-hidden h-64 bg-slate-50 border flex items-center justify-center">
                                                    <img src={selectedItem.file_url} className="w-full h-full object-contain" alt="Current" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase text-center">Replace Media</p>
                                                    <div className="flex flex-col gap-3">
                                                        {/* FilePond */}
                                                        <div className="edit-filepond-container">
                                                            <FilePond
                                                                files={editFile}
                                                                onupdatefiles={setEditFile}
                                                                allowMultiple={false}
                                                                maxFiles={1}
                                                                labelIdle="Drop new image"
                                                                className="edit-filepond"
                                                                imagePreviewHeight={150} // Batasi tinggi preview agar sejajar
                                                            />
                                                        </div>

                                                        {/* Tombol Upload (Hanya muncul jika ada file) */}
                                                        {editFile.length > 0 && (
                                                            <Button
                                                                size="sm"
                                                                onClick={handleUpdateImage}
                                                                disabled={isUploadingEdit}
                                                                className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl h-12 font-bold shadow-lg shadow-emerald-200 transition-all animate-in zoom-in-95"
                                                            >
                                                                {isUploadingEdit ? (
                                                                    <Loader2 className="animate-spin mr-2" />
                                                                ) : (
                                                                    <UploadCloud className="mr-2" size={18} />
                                                                )}
                                                                UPLOAD NEW IMAGE
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-400">Title</Label>
                                                <Input value={selectedItem.title} onChange={(e) => {
                                                        const newTitle = e.target.value;
                                                        if (selectedItem) {
                                                            setSelectedItem({ ...selectedItem, title: newTitle });
                                                        }
                                                        if (editFormData) {
                                                            setEditFormData({ ...editFormData, title: newTitle });
                                                        }
                                                        }} 
                                                        className="rounded-xl h-12 bg-slate-50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-400">Description</Label>
                                                <Textarea value={selectedItem.description} onChange={(e) => {
                                                        const newDesc = e.target.value;

                                                        // Update selectedItem jika ada
                                                        if (selectedItem) {
                                                            setSelectedItem({ ...selectedItem, description: newDesc });
                                                        }

                                                        // Update editFormData jika ada
                                                        if (editFormData) {
                                                            setEditFormData({ ...editFormData, description: newDesc });
                                                        }
                                                        }} 
                                                        className="rounded-xl min-h-[100px] bg-slate-50 resize-none" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <DialogFooter className="p-8 bg-slate-50 shrink-0">
                                <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="font-bold">Close</Button>
                                <Button onClick={handleSaveAllChanges} className="bg-[#00365c] px-8 font-bold rounded-xl">Save Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TabsContent>

                {/* TAB UPLOAD */}
                <TabsContent value="upload" className="mt-0 outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Moment Title</Label>
                                    <Input placeholder="Input title..." value={uploadData.title} onChange={e => setUploadData({...uploadData, title: e.target.value})} className="rounded-2xl h-14 bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Description</Label>
                                    <Textarea placeholder="Input description..." value={uploadData.description} onChange={e => setUploadData({...uploadData, description: e.target.value})} className="rounded-2xl min-h-[120px] bg-slate-50 resize-none" />
                                </div>
                            </div>
                            <Button disabled={isUploading || !files.length} onClick={handleUpload} className="w-full bg-[#00365c] h-14 rounded-2xl font-black text-lg">
                                {isUploading ? <Loader2 className="animate-spin" /> : "POST TO GALLERY"}
                            </Button>
                        </div>
                        <div className="lg:col-span-7 bg-white p-2 rounded-[2.5rem] shadow-sm border min-h-[400px]">
                            <FilePond 
                                files={files} 
                                onupdatefiles={setFiles} 
                                allowMultiple={true} 
                                maxFiles={5} 
                                acceptedFileTypes={['image/*', 'video/*']}
                                allowImageResize={true}
                                imageResizeTargetWidth={1200}
                                imageTransformOutputQuality={80}
                                maxFileSize="10MB"
                                labelIdle='Drag & Drop media atau <span class=filepond--label-action">Browse</span><br/><span className="text-[10px] opacity-50 uppercase font-bold tracking-widest">Images or Video Max 5 Files</span>' 
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Gallery;