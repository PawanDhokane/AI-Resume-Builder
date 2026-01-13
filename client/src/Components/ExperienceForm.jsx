import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";


const expForm = ({ data, onChange }) => {
  
  const {token} = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)


  const addExp = () => {
    const newExp = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExp]);
  };

  const removeExp = (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const updateExp = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index)=>{
    setGeneratingIndex(index)
    const exp = data[index]
    const prompt = `Enhance this job description ${exp.description} for the position of ${exp.position} at ${exp.company}.`

    try {
      const {data} = await api.post('api/ai/enhance-job-desc', {userContent : prompt}, {headers : {Authorization : token}})
      updateExp(index , 'description',data.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    } finally{
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional exp
          </h3>
          <p className="text-sm text-gray-500">Add your Job exp</p>
        </div>
        <button
          onClick={addExp}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add exp
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No Work exp added yet. </p>
          <p>Click "Add exp" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>exp #{index + 1}</h4>
                <button
                  onClick={() => removeExp(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={exp.company || ""}
                  onChange={(e) => updateExp(index, "company", e.target.value)}
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                 <input
                  value={exp.position || ""}
                  onChange={(e) => updateExp(index, "position", e.target.value)}
                  type="text"
                  placeholder="Job title"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                 <input
                  value={exp.start_date || ""}
                  onChange={(e) => updateExp(index, "start_date", e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                 <input
                  value={exp.end_date || ""}
                  disabled={exp.is_current}
                  onChange={(e) => updateExp(index, "end_date", e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2">
              <input type="checkbox" checked={exp.is_current || false} onChange={(e)=>{updateExp(index , "is_current", e.target.checked ? true : false);}} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Job description</label>
                    <button onClick={()=>generateDescription(index)} disabled={generatingIndex=== index || !exp.position || !exp.company} className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                      {generatingIndex === index ? (
                        <Loader2 className="w-3 h-3 animate-spin"/>
                      ):(
                        <Sparkles className='w-3 h-3'/>
                      )}
                        
                        Enhance with AI
                    </button>
                </div>

                <textarea  rows={4} value={exp.description || ""} onChange={(e)=>updateExp(index , "description" , e.target.value)} className="w-full text-sm px-3 py-2 rounded-lg resize-none" placeholder="Describe your key responsibilities and achievements..."/>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default expForm;
