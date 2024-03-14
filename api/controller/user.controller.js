import User from "../models/user.models.js";
import { createError } from "../untils/createError.js";
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.payload.id !== user.id) {
    return res.status(403).send("You can delete your account !!");
  }
  await User.findOneAndDelete({ _id: user._id });
  return res.status(200).send("Deleted !!");
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isSeller: true }
    );
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};
export const addMoreInfor = async (req, res, next) => {
  try {
    let skills = [];
    let languages = [];
    const user = await User.findById(req.payload.id);
    if (req.body.skills?.id) {
      skills = [...user.skills];
      const index = skills.findIndex(
        (item) => item._id.toString() === req.body.skills.id
      );
      const { id, ...other } = req.body.skills;
      skills[index] = other;
    } else {
      skills = [...user.skills, req.body.skills];
    }
    if (req.body.languages?.id) {
      languages = [...user.languages];
      const index = languages.findIndex(
        (item) => item._id.toString() === req.body.languages.id
      );
      const { id, ...other } = req.body.languages;
      languages[index] = other;
    } else {
      languages = [...user.languages, req.body.languages];
    }
    const updateUser = await User.findByIdAndUpdate(
      {
        _id: req.payload.id,
      },
      {
        ...(req.body.desc && { desc: req.body.desc }),
        ...(req.body.languages && { languages }),
        ...(req.body.skills && { skills }),
      },
      { new: true }
    );
    return res.status(200).send(updateUser);
  } catch (err) {
    next(err);
  }
};

export const deletedLan = async (req, res, next) => {
  //  find id in lan update or delete
  try {
    const user = await User.findById(req.payload.id);
    const lans = [...user.languages];
    const newLans = lans.filter(
      (item) => item._id.toString() !== req.params.id
    );
    const update = await User.findByIdAndUpdate(
      {
        _id: req.payload.id,
      },
      {
        languages: newLans,
      },
      { new: true }
    );
    return res.status(200).send(update);
  } catch (err) {
    next(err);
  }
};
export const deletedSkill = async (req, res, next) => {
  //  find id in skill update or delete
  try {
    const user = await User.findById(req.payload.id);
    const skills = [...user.skills];
    const newSkills = skills.filter(
      (item) => item._id.toString() !== req.params.id
    );
    const update = await User.findByIdAndUpdate(
      {
        _id: req.payload.id,
      },
      {
        skills: newSkills,
      },
      {
        new: true,
      }
    );
    return res.status(200).send(update);
  } catch (err) {
    next(err);
  }
};
