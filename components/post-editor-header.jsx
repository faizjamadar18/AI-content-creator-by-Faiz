"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Save,
    Send,
    Loader2,
} from "lucide-react";


export default function PostEditorHeader({
  mode,
  initialData,
  isPublishing,
  onSave,
  onPublish,
  onBack,
}) {
    const isDraft = initialData?.status === "draft";
    const isEdit = mode === "edit";
    return (
        <header className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>

                    {isDraft && (
                        <Badge
                            variant="secondary"
                            className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                        >
                            Draft
                        </Badge>
                    )}
                </div>

                {/* Right */}
                <div className="flex items-center space-x-3">
                    {!isEdit && (
                        <Button
                            onClick={onSave}
                            disabled={isPublishing}
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                        >
                            <Save className="h-4 w-4" />
                        </Button>
                    )}

                    {isEdit ? (
                        <Button
                            variant={"primary"}
                            disabled={isPublishing}
                            onClick={onPublish}
                        >
                            {isPublishing ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4 mr-2" />
                            )}
                            Update
                        </Button>
                    ) : (
                        <Button
                            variant={"primary"}
                            disabled={isPublishing}
                            onClick={() => {
                                onPublish();
                            }}
                        >
                            {isPublishing ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4 mr-2" />
                            )}
                            Publish Now
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}