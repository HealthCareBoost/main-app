import { z } from "zod";

export type ImageInfo = {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_extension: string;
  original_filename: string;
  path: string;
  placeholder: boolean | string | undefined;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

export const ImageInfoSchema = z
  .object({
    access_mode: z.string(),
    asset_id: z.string(),
    batchId: z.string(),
    bytes: z.number().positive(),
    created_at: z.string(),
    etag: z.string(),
    folder: z.string(),
    format: z.string(),
    height: z.number().positive(),
    id: z.string(),
    original_extension: z.string().optional().default("png"),
    original_filename: z.string(),
    path: z.string(),
    placeholder: z.ostring().or(z.boolean()),
    public_id: z.string(),
    resource_type: z.string(),
    secure_url: z.string(),
    signature: z.string(),
    tags: z.string().array(),
    thumbnail_url: z.string(),
    type: z.string(),
    url: z.string(),
    version: z.number(),
    version_id: z.string(),
    width: z.number().positive(),
  })
  .array();
