import axios from "axios";

export const addPost = async (description: string, file: File): Promise<any> => {
    try {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("file", file);
        console.log(formData.get("description"));
        console.log(formData.get("file"));
        const res = await axios.post("http://localhost:8080/post/add", formData, {
            withCredentials: true, // axios ustawi Content-Type na multipart/form-data automatycznie
        });

        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};