import React, { useEffect, useState } from 'react'
import "./blog.scss"
import NavBar from '../../components/navbar/NavBar'
import img from "../../assests/img1.png"
import BlogCard from '../../components/blogCard/BlogCard'

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../actions/blogAction'
import { ThreeCircles } from 'react-loader-spinner'


const Blog = () => {

    const { isloading, blogs } = useSelector(state => state.blogReducer);
    const dispatch = useDispatch();

    const [blogArray, setBlogArray] = useState([]);

    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        img: ""
    });


    useEffect(() => {
        dispatch(getBlogs());
    }, []);

    useEffect(() => {
        if (blogs) {
            setBlogArray(blogs);
            setBlogData({ title: blogs[0]?.title, description: blogs[0]?.description, img: blogs[0]?.img })
        }
    }, [blogs]);


    const setBlog = (data) => {
        setBlogData({ title: data.title, description: data.description, img: data.img })
    }



    return (
        <>
            <div className='blogPage'>
                <NavBar />

                {isloading ? <div className='loader_blog'>
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div> : null}


                <div className='inner'>
                    <div className='imageCon' style={{ background: 'url(${blogData.img}) no-repeat center center / cover' }}>
                        <div>
                            <section> {blogData.title} </section>
                        </div>
                    </div>

                    <div className='title'>Description : </div>

                    <div className='Description'>
                        {blogData.description}
                    </div>

                    <div className='bottomHeader'>
                        Short Reads
                        <ArrowCircleLeftIcon className='rightArrow' style={{ fontSize: "30px" }} />
                        <ArrowCircleRightIcon className='leftArrow' style={{ fontSize: "30px" }} />
                    </div>

                    <div className='blogCardCon'>

                        {blogArray.map((val, index) => {
                            return (
                                <BlogCard key={index} data={val} fun={setBlog} />
                            );
                        })}

                    </div>

                </div>

            </div>
        </>
    )
}

export default Blog