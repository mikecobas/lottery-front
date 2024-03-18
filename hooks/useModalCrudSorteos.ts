// useModalCrudSorteos.ts
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { FileWithPath } from "@mantine/dropzone";
import useContestPost from "@/hooks/useContestPost";
import { Contest } from "@/interfaces/constest.inteface";
import useContest from "./useConstest";


export default function useModalCrudSorteos(
  data: Contest,
  abrirModal: boolean,
  setModalEdit: (value: boolean) => void,
  initialState: any,
  action: "create" | "edit",
  id?: string
) {
  const { getContests } = useContest();
  const { postContest } = useContestPost(action, id);
  const [opened, { open, close }] = useDisclosure(false);
  const [post, setPost] = useState(initialState);
  const [newValue, setNewValue] = useState(data);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    abrirModal ? open() : close();
  }, [abrirModal]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPost({ ...post, [field]: event.target.value });
    setNewValue({ ...newValue, [field]: event.target.value });
  };

  const handleStatusChange = (value: any) => {
    setPost({ ...post, contestStatus: value });
    setNewValue({ ...newValue, contestStatus: value });
  };

  const handlePostContest = () => {
    postContest({
      name: post.name,
      contestStatus: post.contestStatus,
      rounds: post.rounds,
      contestDate: post.contestDate,
    });
    setPost(initialState);
    close();
  };

  return {
    opened,
    open,
    close,
    post,
    setPost,
    newValue,
    setNewValue,
    files,
    setFiles,
    handleInputChange,
    handleStatusChange,
    handlePostContest,
    getContests,
  };
}
