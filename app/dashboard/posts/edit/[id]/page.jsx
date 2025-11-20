"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useConvexQuery } from '@/hooks/use-convex-query-mutation'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import PostEditor from '@/components/post-editor'

const EditPage = () => {
  const params = useParams()
  const postId = params.id

  const { data: post, isLoading, error } = useConvexQuery(api.posts.getById, { id: postId })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
          <span className="text-slate-300">Loading post...</span>
        </div>
      </div>
    );
  }
  if (error || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Post Not Found</h1>
          <p className="text-slate-400">
            The post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PostEditor initialData={post} mode='edit'></PostEditor>
    </div>
  )
}

export default EditPage
