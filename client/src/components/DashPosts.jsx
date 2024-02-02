import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Alert, Button, Modal, TextInput, Table } from "flowbite-react";

export default function DashPosts() {
  const { currentUsers } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userID=${currentUsers._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUsers.isAdmin) {
      fetchPosts();
    }
  }, [currentUsers._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUsers._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUsers._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div
      className="table-auto overflow-x-scroll  md:mx-auto p-3 scrollbar scrollbar-track-slate-100
     scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUsers.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell> Date Updated </Table.HeadCell>
              <Table.HeadCell> Post Image </Table.HeadCell>
              <Table.HeadCell> Post Title </Table.HeadCell>
              <Table.HeadCell> Category </Table.HeadCell>
              <Table.HeadCell> Delete </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body>
                <Table.Row className="bg-slate-50 dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500 "
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="font-medium ">
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-400 cursor-pointer"
                    >
                      <FaTrash />
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-teal-500"
                    >
                      <span>
                        <FaEdit />
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center"
            >
              ShowMore
            </button>
          )}
        </>
      ) : (
        <p> You have no posts</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-200 mb-4 mx-auto " />
            <h3 className="text-lg">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex mt-4 justify-between">
              <Button gradientDuoTone="pinkToOrange" onClick={handleDeletePost}>
                Yes , I'm sure
              </Button>
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
