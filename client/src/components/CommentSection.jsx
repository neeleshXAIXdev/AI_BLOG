import { useState } from "react";
import API from "../api/axios";

const CommentSection = ({ blogId, comments, refresh }) => {
  const [text, setText] = useState("");

  const handleComment = async () => {
    if (!text) return;

    await API.post(`/comments/${blogId}`, { text });
    setText("");
    refresh();
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <div className="space-y-3">
        {comments?.map((c) => (
          <div
            key={c._id}
            className="bg-white/10 border border-white/10 p-3 rounded-lg"
          >
            {c.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 rounded bg-white/10 border border-white/10 text-white"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleComment} className="bg-blue-500 px-4 rounded">
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
