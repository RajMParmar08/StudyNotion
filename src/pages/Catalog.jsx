import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import Error from "./Error";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(""); // will set dynamically
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState([]);

  // Fetch all categories or use static ID for "All"
  useEffect(() => {
    const getCategories = async () => {
      if (catalogName === "All") {
        // Use a static category ID for "All"
        setCategoryId("6651c64c4f8f9d1ec3ab462f");
      } else {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category = res?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );
        setCategoryId(category?._id || "");
      }
    };
    getCategories();
  }, [catalogName]);

  // Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      if (!categoryId) return;

      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("Catalog API Response: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  // Merge courses for "All"
  useEffect(() => {
    if (catalogName === "All" && catalogPageData?.data) {
      debugger
      // const selectedCourses =
      //   catalogPageData?.data?.selectedCategory?.courses || [];
      // const differentCourses =
      //   catalogPageData?.data?.differentCategory?.courses || [];
const mostselling  =
        catalogPageData?.data?.mostSellingCourses || [];
        debugger
      setAllCourses([ ...mostselling]);
    }
  }, [catalogPageData, catalogName]);

  const filteredCourses =
    (catalogName === "All"
      ? allCourses
      : catalogPageData?.data?.selectedCategory?.courses) // normal catalog courses
      ?.filter((course) =>
        course?.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogName === "All"
                ? "All Courses"
                : catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogName === "All"
              ? "All Courses"
              : catalogPageData?.data?.selectedCategory?.name}
          </p>

          {/* Search Bar */}
          <div className="my-6 flex justify-start">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-300 focus:border-yellow-25 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 1 - Courses */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider Courses={filteredCourses} />
        </div>
      </div>

      {/* Only first section is shown for "All" */}
      {catalogName !== "All" && (
        <>
          {/* Section 2 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Catalog;
