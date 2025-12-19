"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import z, { file, promise } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, Wand2, Check, ImageIcon, X, RefreshCw, Crop } from "lucide-react";
import { toast } from "sonner";
import { buildTransformationUrl, uploadToImageKit } from "@/lib/image-upload";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// Form validation schema
const transformationSchema = z.object({
    aspectRatio: z.string().default("original"),
    backgroundRemoved: z.boolean().default(false),
    dropShadow: z.boolean().default(false),
});

const ASPECT_RATIOS = [
    { label: "Original", value: "original" },
    { label: "Square (1:1)", value: "1:1", width: 400, height: 400 },
    { label: "Landscape (16:9)", value: "16:9", width: 800, height: 450 },
    { label: "Portrait (4:5)", value: "4:5", width: 400, height: 500 },
    { label: "Story (9:16)", value: "9:16", width: 450, height: 800 },
];


const ImageUploadModal = ({ onOpen, onClose, onImageSelect }) => {


    const { watch, setValue, reset } = useForm({
        resolver: zodResolver(transformationSchema),
        defaultValues: {
            aspectRatio: "original",
            backgroundRemoved: false,
            dropShadow: false,
        }
    })
    const watchedValues = watch()
    const resetForm = () => {
        setActiveTab("update")
        setUploadedImage(null)
        setTransformedImage(null)
        reset()
    }
    const handleClose = () => {
        onClose()
        resetForm()
    }
    const [uploadedImage, setUploadedImage] = useState(null);
    const [transformedImage, setTransformedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [activeTab, setActiveTab] = useState("upload");

    // Handle image selection
    const handleSelectImage = () => {
        if (transformedImage) {
            onImageSelect({
                url: transformedImage,
                originalUrl: uploadedImage?.url,
                fileId: uploadedImage?.fileId,
                name: uploadedImage?.name,
                width: uploadedImage?.width,
                height: uploadedImage?.height,
            });
            onClose();
            resetForm();
        }
    };

    const onDrop = async (acceptedFiles) => { // this returns a array of files of size:1 even if we have make it mutiple: false 
        const file = acceptedFiles[0]
        if (!file) {
            return
        }
        if (file.size > 10 * 1024 * 1024) {  // if file size is greater than 10mb 
            toast.error("File size must be less than 10MB");
            return;
        }
        setIsUploading(true)
        try {
            const fileName = `post-image-${Date.now()}-${file.name}`;
            const result = await uploadToImageKit(file, fileName)
            // result : 
            // data= {            
            //      success: true,
            //      url: uploadResponse.url,
            //      fileId: uploadResponse.fileId,
            //      width: uploadResponse.width,
            //      height: uploadResponse.height,
            //      size: uploadResponse.size,
            //      name: uploadResponse.name,
            // }

            if (result.success) {
                setUploadedImage(result.data)
                setTransformedImage(result.data.url)
                setActiveTab("transform");
                toast.success("Image uploaded successfully!");
            } else {
                toast.error(result.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };



    // npm i react-dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, // what to do when a file is dropped
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"], // what file types are allowed
        },
        multiple: false, // whether to allow multiple files or not
    });
    // getRootProps, getInputProps, and isDragActive are helpers from useDropzone that let you
    //  make a drag-and-drop upload area — getRootProps 
    // sets up the drop zone, getInputProps : the input where the file will be dropped ,
    // and isDragActive tells if a file is being dragged over it.


    // Apply transformations
    const applyTransformations = async () => {
        if (!uploadedImage) return;

        setIsTransforming(true);

        try {
            let transformationChain = [];

            // Aspect ratio and resizing
            if (watchedValues.aspectRatio !== "original") {
                const ratio = ASPECT_RATIOS.find(
                    (r) => r.value === watchedValues.aspectRatio
                );
                if (ratio) {
                    transformationChain.push({
                        width: ratio.width,
                        height: ratio.height,
                    });
                }
            }

            // Background removal
            if (watchedValues.backgroundRemoved) {
                transformationChain.push({ effect: "removedotbg" });
            }

            // Drop shadow (only works with transparent background)
            if (watchedValues.dropShadow && watchedValues.backgroundRemoved) {
                transformationChain.push({ effect: "dropshadow" });
            }


            // Apply transformations
            const transformedUrl = await buildTransformationUrl(
                uploadedImage.url,
                transformationChain
            );


            // Add a small delay to show loading state and allow ImageKit to process
            await new Promise((resolve) => setTimeout(resolve, 3000));

            console.log(transformedUrl)
            setTransformedImage(transformedUrl);

            toast.success("Transformations applied!");
        } catch (error) {
            console.error("Transformation error:", error);
            toast.error("Failed to apply transformations");
        } finally {
            setIsTransforming(false);
        }
    };

    const resetTransformations = () => {
        reset()
        setTransformedImage(uploadedImage.url)
    }

    return (
        <Dialog open={onOpen} onOpenChange={handleClose}>
            <DialogContent className="!max-w-6xl !h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white">Upload & Transform Image</DialogTitle>
                    <DialogDescription>
                        Upload an image and apply AI-powered transformations
                    </DialogDescription>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="transform" disabled={!uploadedImage}>
                            Transform
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-4">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                                ? "border-purple-400 bg-purple-400/10"
                                : "border-slate-600 hover:border-slate-500"
                                }`}
                        >
                            <input {...getInputProps()} />

                            {isUploading ? (
                                <div className="space-y-4">
                                    <Loader2 className="h-12 w-12 mx-auto animate-spin text-purple-400" />
                                    <p className="text-slate-300">Uploading image...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="h-12 w-12 mx-auto text-slate-400" />
                                    <div>
                                        <p className="text-lg text-white">
                                            {isDragActive
                                                ? "Drop the image here"
                                                : "Drag & drop an image here"}
                                        </p>
                                        <p className="text-sm text-slate-400 mt-2">
                                            or click to select a file (JPG, PNG, WebP, GIF - Max 10MB)
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                        {uploadedImage && (
                            <div className="text-center space-y-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-green-500/20 text-green-300 border-green-500/30"
                                >
                                    <Check className="h-3 w-3 mr-1" />
                                    Image uploaded successfully!
                                </Badge>
                                <div className="text-sm text-slate-400">
                                    {uploadedImage.width} × {uploadedImage.height} •{" "}
                                    {Math.round(uploadedImage.size / 1024)}KB
                                </div>
                                <Button
                                    onClick={() => setActiveTab("transform")}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    Start Transforming
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="transform" className="space-y-6">
                        <div className="grid lg:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center">
                                        <Wand2 className="h-5 w-5 mr-2" />
                                        AI Transformations
                                    </h3>

                                    {/* Background Removal */}
                                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-white font-medium">
                                                Remove Background
                                            </Label>
                                            <Button
                                                type="button"
                                                variant={
                                                    watchedValues.backgroundRemoved
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setValue(
                                                        "backgroundRemoved",
                                                        !watchedValues.backgroundRemoved
                                                    )
                                                }
                                            >
                                                {watchedValues.backgroundRemoved ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <X className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-slate-400">
                                            AI-powered background removal
                                        </p>
                                    </div>

                                    {/* Drop Shadow */}
                                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-white font-medium">
                                                Drop Shadow
                                            </Label>
                                            <Button
                                                type="button"
                                                variant={
                                                    watchedValues.dropShadow ? "default" : "outline"
                                                }
                                                size="sm"
                                                disabled={!watchedValues.backgroundRemoved}
                                                onClick={() =>
                                                    setValue("dropShadow", !watchedValues.dropShadow)
                                                }
                                            >
                                                {watchedValues.dropShadow ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <X className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-slate-400">
                                            {watchedValues.backgroundRemoved
                                                ? "Add realistic shadow"
                                                : "Requires background removal"}
                                        </p>

                                    </div>
                                    {/* Aspect Ratio & Cropping */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center">
                                            <Crop className="h-5 w-5 mr-2" />
                                            Resize & Crop
                                        </h3>

                                        <div className="space-y-3">
                                            <Label className="text-white">Aspect Ratio</Label>
                                            <Select
                                                value={watchedValues.aspectRatio}
                                                onValueChange={(value) => setValue("aspectRatio", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ASPECT_RATIOS.map((ratio) => (
                                                        <SelectItem key={ratio.value} value={ratio.value}>
                                                            {ratio.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={applyTransformations}
                                            disabled={isTransforming}
                                            variant={"primary"}
                                        >
                                            {isTransforming ? (
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            ) : (
                                                <Wand2 className="h-4 w-4 mr-2" />
                                            )}
                                            Apply Transformations
                                        </Button>

                                        <Button onClick={resetTransformations} variant="outline">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Reset
                                        </Button>
                                    </div>

                                </div>
                            </div>


                            {/* Image Preview */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <ImageIcon className="h-5 w-5 mr-2" />
                                    Preview
                                </h3>

                                {transformedImage && (
                                    <div className="relative">
                                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                            <img
                                                src={transformedImage}
                                                alt="Transformed preview"
                                                className="w-full h-auto max-h-96 object-contain rounded-lg mx-auto"
                                                onError={() => {
                                                    toast.error("Failed to load transformed image");
                                                    setTransformedImage(uploadedImage?.url);
                                                }}
                                            />
                                        </div>

                                        {isTransforming && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                                <div className="bg-slate-800 rounded-lg p-4 flex items-center space-x-3">
                                                    <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                                                    <span className="text-white">
                                                        Applying transformations...
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {uploadedImage && transformedImage && (
                                    <div className="text-center space-y-4">
                                        <div className="text-sm text-slate-400">
                                            Current image URL ready for use
                                        </div>

                                        <div className="flex gap-3 justify-center">
                                            <Button
                                                onClick={handleSelectImage}
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Check className="h-4 w-4 mr-2" />
                                                Use This Image
                                            </Button>

                                            <Button
                                                onClick={handleClose}
                                                variant="outline"
                                                className="border-slate-600 hover:bg-black"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog >
    )
}

export default ImageUploadModal 
