import { ADD_BLOG, BLOG_REQUEST, BLOG_SUCCESS, ADD_NEW_BLOG, DEL_BLOG, UPDATE_NEW_BLOG } from "../constants/blogConstants";
import axios from "axios";
import axiosNew from "../apiConfig/api";



const uploadData = async (data, dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axiosNew.post("/add_blog", data, config);
        dispatch({ type: ADD_NEW_BLOG, payload: res.data.blog });
    } catch (error) {
        console.log(error);
    }
}

const updateData = async (data, dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axiosNew.post("/update_blog", data, config);
        dispatch({ type: UPDATE_NEW_BLOG, payload: res.data.newBlog });
    } catch (error) {
        console.log(error);
    }
}


export const addBlog = (blogData) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_REQUEST });
        const data = new FormData();
        data.append("file", blogData.img);
        data.append("upload_preset", "myappintern");
        axios.post("https://api.cloudinary.com/v1_1/dplwvxqum/image/upload", data).then(({ data }) => {
            uploadData({ ...blogData, img: data.url, public_id: data.public_id }, dispatch);
        }).catch((err) => console.log(err));

    } catch (error) {
        console.log(error);
    }
}

export const deleteBlog = (blogData) => async (dispatch) => {
    try {
        dispatch({ type: DEL_BLOG, payload: blogData._id });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosNew.post("/delete_blog", blogData, config);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog = (blogData) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };

        if (blogData.imgChange) {

            const del_id = blogData.public_id;

            const data = new FormData();
            data.append("file", blogData.img);
            data.append("upload_preset", "myappintern");
            axios.post("https://api.cloudinary.com/v1_1/dplwvxqum/image/upload", data).then(({ data }) => {
                updateData({ ...blogData, img: data.url, public_id: data.public_id, del_id }, dispatch);
            }).catch((err) => console.log(err));

        } else {
            const { data } = await axiosNew.post("/update_blog", blogData, config);
            console.log(data.newBlog);
            dispatch({ type: UPDATE_NEW_BLOG, payload: data.newBlog });
        }

    } catch (error) {
        console.log(error);
    }
}



export const getBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: BLOG_REQUEST });
        const { data } = await axiosNew.get("/get_blog");
        dispatch({ type: BLOG_SUCCESS, payload: data.blogs });
    } catch (error) {
        console.log(error);
    }
}