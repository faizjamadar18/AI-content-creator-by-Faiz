"use client"
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Icon, ImageIcon, Minus, Plus, Sparkles, Wand2 } from 'lucide-react';
import { Input } from './ui/input';
import { BarLoader } from 'react-spinners';
import { generateBlogContent, improveContent } from '@/app/actions/gemini';
import { toast } from 'sonner';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// It runs your React code on the server first, to generate HTML.Then sends that HTML to the browser.But… 😬 not all packages can run on the server.
// In Next.js, some libraries (like react-quill) only work in the browser (because they use window object).
// So you load them dynamically to avoid server errors.

if (typeof window !== "undefined") {
  import("react-quill-new/dist/quill.snow.css");
}
// It checks if code is running in browser (window exists).If yes, it imports the Quill editor's CSS theme (snow theme).
// Without this, your text editor will look plain — no toolbar, no styling.

const quillConfig = {
  modules: {
    toolbar: {
      container: [  // these are all the content for text editor like header size(1,2,3 or normal(false)),bold, italic ,etc 
        [{ header: [1, 2, 3, false] }],
        [{ size: ["small", false, "large", "huge"] }], // false : normal 
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],  //color[]: shows box of colors ,background[]: also shows box of color to change the bg color 
        [{ align: [] }], // text align like left right or centre  
        ["link", "blockquote", "code-block"],  // adding link in your blog , blockquote(" "), code-block: the block where any code can be written 
        [
          { list: "ordered" },  // 1.one, 2.two , 3.three
          { list: "bullet" },  // .one, .two , .three
          { indent: "-1" },    // indentation +1 
          { indent: "+1" },   // indentation -1 
        ]
      ]
    }
  },

  // This tells Quill which styles and formats are allowed in the blog.For example:If you don’t include "image" here, even if the toolbar has an image button, it won’t work.
  formats: [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "link",
    "blockquote",
    "code-block",
    "list",
    "indent",
  ],
};

const PostEditorContent = ({ form, onImageUpload }) => {

  const {  // This means we are taking out some useful tools
    register, // Used to connect your input boxes with React Hook Form.It tells the form — “Hey, this input belongs to me, track its value and validation.”
    watch,  // Used to see the current value of one or more form fields in real-time (while typing).
    setValue,  // Used to manually change the value of a form field with code.
    formState: { errors },  // This stores all the validation error messages for your form fields.
  } = form;


  // const getQuillModules = () => ({
  //   ...quillConfig.modules,  // spred the modules 
  //   toolbar: {
  //     ...quillConfig.modules.toolbar, // spresd the toolbar 
  //   },
  // });

  const watchedValues = watch() // watchVlues contains all the vlaues from the form like title,content , etc
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImproving, setIsImproving] = useState(false);


  const hasTitle = watchedValues.title?.trim();
  const hasContent = watchedValues.content && watchedValues.content !== "<p><br></p>";
  // "<p><br></p>".Why this specific string? 🤔Because many rich text editors (like Quill or TipTap) return "<p><br></p>" when the editor is visually empty

  const handleAI = async (type, improvementType = null) => {
    const { title, content } = watchedValues;

    if (type === "generate") {
      if (!title?.trim())
        return toast.error("Please add a title before generating content");
      if (
        content &&
        content !== "<p><br></p>" &&
        !window.confirm("This will replace your existing content. Continue?")
      )
        return;
      setIsGenerating(true);
    } else {
      if (!content || content === "<p><br></p>")
        return toast.error("Please add some content before improving it");
      setIsImproving(true);
    }

    try {
      const result =
        type === "generate"
          ? await generateBlogContent(title)
          : await improveContent(content, improvementType);

      if (result.success) {
        setValue("content", result.content);
        toast.success(
          `Content ${type === "generate" ? "generated" : improvementType + "d"} successfully!`
        );
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(`Failed to ${type} content. Please try again.`);
    } finally {
      type === "generate" ? setIsGenerating(false) : setIsImproving(false);
    }
  };

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-5">
          {/* Featured Image */}
          {watchedValues.featuredImage ? (
            <div className="relative group">
              <img
                src={watchedValues.featuredImage}
                alt="Featured"
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-3">
                <Button
                  onClick={() => onImageUpload()}
                  variant="secondary"
                  size="sm"
                >
                  Change Image
                </Button>
                <Button
                  onClick={() => setValue("featuredImage", "")}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={onImageUpload}
              className="w-full h-36 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center space-y-4 hover:border-slate-500 transition-colors group"
            >
              <ImageIcon className="h-12 w-12 text-slate-400 group-hover:text-slate-300" />
              <div className="text-center">
                <p className="text-slate-300 text-lg font-medium">
                  Add a featured image
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Upload and transform with AI
                </p>
              </div>
            </button>
          )}

          {/* Title */}
          <div>
            <Input
              {...register("title")}
              placeholder="Post title..."
              className="border-0 text-4xl font-bold bg-transparent placeholder:text-slate-500 text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
            />
            {errors.title && (
              <p className="text-red-400 mt-2">{errors.title.message}</p>
            )}
          </div>

          {/* AI Tools */}
          <div>
            {!hasContent ? (
              <Button
                onClick={() => handleAI("generate")}
                disabled={!hasTitle || isGenerating || isImproving}
                variant="outline"
                size="sm"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white disabled:opacity-50 w-full"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Content with AI
              </Button>
            ) : (
              <>
                <div className="grid grid-cols-3 w-full gap-2">
                  {[
                    { type: "enhance", icon: Sparkles, color: "border-green-500 text-green-600 hover:bg-green-500" },
                    { type: "expand", icon: Plus, color: "border-blue-500 text-blue-600 hover:bg-blue-500" },
                    { type: "simplify", icon: Minus, color: "border-orange-500 text-orange-600 hover:bg-orange-500" },
                  ].map(({ type, icon: Icon, color }) => (
                    <Button
                      key={type}
                      onClick={() => handleAI("improve", type)}
                      disabled={isGenerating || isImproving}
                      variant="outline"
                      size="sm"
                      className={`${color} hover:text-white disabled:opacity-50`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      AI {type}
                    </Button>
                  ))}
                </div>
              </>
            )}
            {!hasTitle && (
              <p className="text-xs text-slate-400 w-full pt-2">
                Add a title to enable AI content generation
              </p>
            )}
          </div>

          {(isGenerating || isImproving) && (
            <BarLoader width={"95%"} color="#D8B4FE" />
          )}

          {/* editor */}
          <div className="prose prose-lg max-w-none">
            <ReactQuill
              theme='snow'
              formats={quillConfig.formats}
              modules={quillConfig.modules}
              //Whatever is written inside quillConfig.modules (like toolbar, history, etc.) will be used as-is. You cannot easily customize or override parts of it dynamically.
              // If you want to change how the image button behaves (e.g., open a custom upload dialog), you can’t do it easily here because the config is static.so we have to make a seperate function for this 
              // modules={getQuillModules()}
              value={watchedValues.content}  // .content is the content field of the form 
              onChange={(content) => setValue("content", content)}
              placeholder="Tell your story... or use AI to generate content!"
              style={{
                minHeight: "400px",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}

            />
            {errors.content && (
              <p className="text-red-400 mt-2">{errors.content.message}</p>
            )}
          </div>


        </div>
      </main>

      <style jsx global>{`
        .ql-editor {
          color: white !important;
          font-size: 1.125rem !important;
          line-height: 1.7 !important;
          padding: 0 !important;
          min-height: 400px !important;
        }
        .ql-editor::before {
          color: rgb(100, 116, 139) !important;
        }
        .ql-toolbar {
          border: none !important;
          padding: 0 0 1rem 0 !important;
          position: sticky !important;
          top: 80px !important;
          background: rgb(15, 23, 42) !important;
          z-index: 30 !important;
          border-radius: 8px !important;
          margin-bottom: 1rem !important;
        }
        .ql-container {
          border: none !important;
        }
        .ql-snow .ql-tooltip {
          background: rgb(30, 41, 59) !important;
          border: 1px solid rgb(71, 85, 105) !important;
          color: white !important;
        }
        .ql-snow .ql-picker {
          color: white !important;
        }
        .ql-snow .ql-picker-options {
          background: rgb(30, 41, 59) !important;
          border: 1px solid rgb(71, 85, 105) !important;
        }
        .ql-snow .ql-fill,
        .ql-snow .ql-stroke.ql-fill {
          fill: white !important;
        }
        .ql-snow .ql-stroke {
          stroke: white !important;
        }
        .ql-editor h2 {
          font-size: 2rem !important;
          font-weight: 600 !important;
          color: white !important;
        }
        .ql-editor h3 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: white !important;
        }
        .ql-editor blockquote {
          border-left: 4px solid rgb(147, 51, 234) !important;
          color: rgb(203, 213, 225) !important;
          padding-left: 1rem !important;
          font-style: italic !important;
        }
        .ql-editor a {
          color: rgb(147, 51, 234) !important;
        }
        .ql-editor code {
          background: rgb(51, 65, 85) !important;
          color: rgb(248, 113, 113) !important;
          padding: 0.125rem 0.25rem !important;
          border-radius: 0.25rem !important;
        }
      `}</style>

    </>
  )
}

export default PostEditorContent
