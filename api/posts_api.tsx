import apiClient from "./api_client";

const getAllPosts = async (accessToken: string, sender: any) => {
  apiClient.setHeaders({ Authorization: "JWT " + accessToken });
  return apiClient.get("/post", sender);
};
const updatePostById = async (accessToken: string, postJson: any, id: any) => {
  apiClient.setHeaders({ Authorization: "JWT " + accessToken });
  return apiClient.put("/post/" + id.split('"').join(""), postJson);
};
const addPost = async (postJson: any, accessToken: string) => {
  apiClient.setHeaders({ Authorization: "JWT " + accessToken });
  return apiClient.post("/post", postJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  updatePostById,
};
