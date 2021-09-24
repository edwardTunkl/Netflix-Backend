import express from "express";
import uniqid from "uniqid";
import { getMedia, writeMedia } from "../library/fs-tool.js";

//********************************************

const mediaRouter = express.Router();

//---GET---

mediaRouter.get("/", async (req, res, next) => {
  try {
    const media = await getMedia();
    res.send(media);
  } catch (error) {
    next(error);
  }
});

//---GET:id---

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    const media = await getMedia();
    const mediaById = media.find((med) => med.id === req.params.id);

    if (mediaById) {
      res.send(mediaById);
    } else {
      next(createHttpError(404, `Blog with ID ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

//---POST---

mediaRouter.post("/", async(req, res, next) => {
  try{
    const newMedia = {
      id: uniqid(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const media = await getMedia()
    media.push(newMedia)
    await writeMedia(media)
    res.status(201).send({id: newMedia.id})

  }catch(error){
    next(error)
  }
})

//---PUT---

mediaRouter.put("/:id", async(req, res, next) =>{
  try{
    const media = await getMedia()
    const remainingMedia = media.filter(med => med.id !== req.params.id)
    const updatedMedia ={
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id
    }
    remainingMedia.push(updatedMedia)
    await writeMedia(remainingMedia)
    res.status(200).send(updatedMedia)
  }catch(error){
    next(error)
  }
})

//---Delete---

mediaRouter.delete("/:id", async(req, res, next) => {
  try{
    const media = await getMedia()
    const filteredMedia = media.filter(med=> med.id !== req.params.id)
    await writeMedia(filteredMedia)
    res.status(204).send()
  }catch(error){
    next(error)
  }
})

export default mediaRouter;
