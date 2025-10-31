"use client"
import { api } from '@/convex/_generated/api';
import { useConvexMutation } from '@/hooks/use-convex-query-mutation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'
import PostEditorHeader from './post-editor-header';
import { zodResolver } from "@hookform/resolvers/zod";
import PostEditorContent from './post-editor-content';
import { toast } from 'sonner';
import ImageUploadModal from './image-upload-modal';


// zod is used to validate the input you type in the form like (this field is required , minimu 10 letters ,etc ) it avoid the manual uploading of error messages which become too hectic to handle 
const postSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    content: z.string().min(1, "Content is required"),
    featuredImage: z.string().optional()
});

const PostEditor = ({ initialData = null, mode = "create" }) => { // "create" or "edit"

    const router = useRouter();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); //  ( to  open or close the image model dialog it can be featured image dialog  )


    // Mutations with built-in loading states
    const { mutate: createPost, isLoading: isCreateLoading } = useConvexMutation(
        api.posts.create
    );
    const { mutate: updatePost, isLoading: isUpdating } = useConvexMutation(
        api.posts.update
    );
    const form = useForm({  // Without it, you would manually handle onChange, onSubmit, and state for every input — that’s a lot of code 😩. useForm() makes this super simple ✅.
        resolver: zodResolver(postSchema),  // “Hey, use these Zod rules to check if the data is valid.”
        defaultValues: {  // set deafault values in the inputs of the form 
            title: initialData?.title || "",
            content: initialData?.content || "",
            featuredImage: initialData?.featuredImage || "",
        }

    })

    const { watch, handleSubmit, setValue } = form
    const watchedData = watch()

    // Submit handler
    const onSubmit = async (data, action) => {
        try {
            const postData = {
                title: data.title,
                content: data.content,
                featuredImage: data.featuredImage || undefined,
                status: action === "publish" ? "published" : "draft",
            };

            let resultId;

            if (mode === "edit" && initialData?._id) {
                // Always use update for edit mode
                resultId = await updatePost({
                    id: initialData._id,
                    ...postData,
                });
            } else if (initialData?._id) {
                // If we have existing draft data, update it
                resultId = await updatePost({
                    id: initialData._id,
                    ...postData,
                });
            } else {
                // Create new post (will auto-update existing draft if needed)
                resultId = await createPost(postData);
            }
            const message = action === "publish" ? "Post published!" : "Draft saved!";
            toast.success(message);
            if (action === "publish") router.push("/dashboard/posts");
            return resultId;

        } catch (error) {
            toast.error(error.message || "Failed to save post");
            throw error;
        }
    };

    const handleSave = () => {
        handleSubmit((data) => onSubmit(data, "draft"))();
    };

    const handlePublish = () => {
        handleSubmit((data) => onSubmit(data, "publish"))();

    };

    const handleImageSelect = (imageData) => {
        setValue("featuredImage", imageData.url);
        toast.success("Featured image added!");
        setIsImageModalOpen(false)
    }

    return (
        <div>
            {/* Header */}
            <PostEditorHeader
                mode={mode}   // mode:"create" see the parameter 
                initialData={initialData}
                isPublishing={isCreateLoading || isUpdating}
                onSave={handleSave}
                onPublish={handlePublish}
                onBack={() => router.push("/dashboard")}
            />

            {/* Post Content */}
            <PostEditorContent
                form={form}
                onImageUpload={() => setIsImageModalOpen(true)}
            />

            {/* Image Uplosd Dialog */}
            <ImageUploadModal
                onOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onImageSelect={handleImageSelect}
            />

        </div>
    )
}

export default PostEditor
