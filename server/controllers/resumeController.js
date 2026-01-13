// controller for creating a new resume
// POST : /api/resumes/create
import { stringify } from "querystring";
import imagekit from "../configs/imageKit.js";
import Resume from "../models/resume.js";
import fs from "fs";

export const createResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({ userId, title });

    // return success massage

    return res
      .status(200)
      .json({ message: "Resume Created Successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting a new resume
// DElETE : /api/resumes/delete

export const deleteResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success massage

    return res.status(200).json({ message: "Resume deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get user resume by id
// GET : /api/resume/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // return success massage

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get resume by id public
// GET : api/resumes/public

export const getPublicResumeId = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT : /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // let resumeDataCopy ;
    // if(typeof resumeData === 'string'){
    //   resumeDataCopy = JSON.parse(JSON.stringify(resumeData));
    // }else{
    //   resumeDataCopy = structuredClone(resumeData);
    // }

    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
        pre: (removeBackground ? "e-bgremove," : "") + "w-300,h-300,fo-face"

        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: "Saved successfully!", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
