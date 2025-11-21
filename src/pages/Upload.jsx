import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, uploadFile } from "../features/documents/documentSlice";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { tags, loading } = useSelector((state) => state.documents);

  useEffect(() => {
    if (token) dispatch(fetchTags(token));
  }, [token, dispatch]);

  // Mock data (API se nahi aaya to use karo)
  const minorOptions = {
    Personal: ["John", "Tom", "Emily", "Sarah"],
    Professional: ["Accounts", "HR", "IT", "Finance", "Marketing"],
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      const newTag = { tag_name: tagInput.trim() };
      setSelectedTags([...selectedTags, newTag]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    setSelectedTags(selectedTags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const data = {
      major_head: majorHead,
      minor_head: minorHead,
      document_date: date,
      document_remarks: remarks,
      tags: selectedTags,
      user_id: "current_user",
    };
    formData.append("data", JSON.stringify(data));

    dispatch(uploadFile({ formData, token }));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Document</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <select
          value={majorHead}
          onChange={(e) => setMajorHead(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        {majorHead && (
          <select
            value={minorHead}
            onChange={(e) => setMinorHead(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">
              Select {majorHead === "Personal" ? "Name" : "Department"}
            </option>
            {minorOptions[majorHead]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        <div className="border rounded-lg p-3">
          <input
            type="text"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
            className="w-full outline-none"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag.tag_name}
                <button
                  type="button"
                  onClick={() => handleTagRemove(i)}
                  className="font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
