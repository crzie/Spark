import { useState } from "react";
import { Button, Input, InputNumber, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { DatePicker } from "antd";
import { BsCamera } from "react-icons/bs";
const { RangePicker } = DatePicker;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreateEventPage = () => {
    const [banner, setBanner] = useState<File | null>();
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


    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

    };

    return (
        <div className="w-full h-full border-box p-8 ">
            <div className="w-full h-full bg-white rounded-xl overflow-auto">
                <form action="" className=" py-4 px-4">
                    <Title level={1}>Create Event</Title>
                    <div className="flex flex-col gap-3">
                        <div className="w-full bg-emerald-100 rounded-2xl border-dashed border-2 border-emerald-800 flex items-baseline">
                            {banner ? (
                                <img
                                    src={URL.createObjectURL(banner)}
                                    className="w-full rounded-2xl"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "50% 50%",
                                        aspectRatio: "16/4",
                                    }}
                                />
                            ) : (
                                <label
                                    className="b-1 rounded-1 text-2xl w-full h-full flex flex-col items-center justify-center clickable"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "50% 50%",
                                        aspectRatio: "16/4",
                                    }}
                                >
                                    <BsCamera className="w-24 h-24" />
                                    <p>Upload Banner</p>
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            if (e.target.files)
                                                setBanner(e.target.files[0]);
                                        }}
                                    />
                                </label>)}
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
