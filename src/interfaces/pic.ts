export interface Pic {
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: object;
}

export interface FileByTag {
  tag_id?: number;
  file_id?: number;
  tag?: string;
  filename: string;
  filesize?: number;
  title?: string;
  description?: string;
  user_id?: number;
  media_type?: string;
  mime_type?: string;
  time_added?: string;
}
