import fs from "fs-extra"
import path, {join, dirname, extname} from 'path'
import { fileURLToPath } from 'url'

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const mediaJSONPath = join(dataFolderPath, "media.json")

const { readJSON, writeJSON } = fs

export const getMedia = () => readJSON(mediaJSONPath)
export const writeMedia = content => writeJSON(mediaJSONPath, content)