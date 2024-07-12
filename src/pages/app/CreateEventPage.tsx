import React, { useState } from "react";
import { Button, Input, InputNumber, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
import { UploadOutlined } from "@ant-design/icons";
const CreateEventPage = () => {
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full border-box p-8 ">
      <div className="w-full h-full bg-white rounded-xl overflow-auto">
        <form action="" className=" py-4 px-4">
          <Title level={1}>Create Event</Title>
          <div className="flex flex-col gap-3">
            <div className=" w-full flex flex-col items-baseline">
              {/* <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {banner.length < 1 && "+Upload Gallery"}
                </Upload>
              </ImgCrop> */}
            </div>
            <div className="w-3/5 flex flex-col items-baseline">
              <Title level={5}>Event Name</Title>
              <Input placeholder="Event Name" />
            </div>
            <div className="w-3/5 flex flex-col items-baseline">
              <Title level={5}>Description</Title>
              <TextArea rows={4} placeholder="Description" maxLength={500} />
            </div>
            <div className="w-3/5 flex flex-col items-baseline">
              <Title level={5}>Bounty</Title>
              <InputNumber addonAfter="XP" defaultValue={100} />
            </div>
            <div className="w-3/5 flex flex-col items-baseline">
              <Title level={5}>Location</Title>
              <Input placeholder="Location" />
            </div>
            <div className="w-3/5 flex flex-col items-baseline">
              <Title level={5}>Select Date</Title>
              <RangePicker />
            </div>
            <div className="">
              <Title level={5}>Upload Gallery</Title>
              <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+Upload Gallery"}
                </Upload>
              </ImgCrop>
            </div>
            <Button
              size={"large"}
              className=""
              htmlType="submit"
              style={{
                backgroundColor: "#0B6A3C",
                color: "white",
                marginTop: "2vh",
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
