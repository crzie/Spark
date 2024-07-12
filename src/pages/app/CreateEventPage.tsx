import React, { useState } from "react";
import { Button, Input, InputNumber, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { DatePicker } from "antd";
import { BsCamera } from "react-icons/bs";
import { createEvent, uploadImage } from "../../services/firebase";
const { RangePicker } = DatePicker;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreateEventPage = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [bounty, setBounty] = useState<number>(100);
    const [location, setLocation] = useState<string>("");
    const [eventStart, setEventStart] = useState<Date | null>(null);
    const [eventEnd, setEventEnd] = useState<Date | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [error, setError] = useState("");

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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        (async () => {
            if (!eventStart || !eventEnd) {
                setError("Please select a date range");
                return;
            }

            if (!banner) {
                setError("Please upload a banner");
                return;
            }

            if (fileList.length < 1) {
                setError("Please upload at least one gallery image");
                return;
            }

            if (eventStart > eventEnd) {
                setError("Event start date cannot be after event end date");
                return;
            }

            if (eventStart < new Date()) {
                setError("Event start date cannot be in the past");
                return;
            }

            const bannerPath = await uploadImage(banner);
            const galleryPaths = await Promise.all(fileList.map(async (file) => {
                return uploadImage(file.originFileObj as FileType);
            }));

            const eventData: EventData = {
                name,
                description,
                bannerPath,
                galleryPaths,
                bounty,
                location,
                eventStart,
                eventEnd,
                verified: false,
                confirmed: false,
                participantIds: [],
            };

            createEvent(eventData)
                .then(() => {
                    message.success("Event created successfully");
                }).catch((error) => {
                    setError(error.message);
                });
        })();
    };

    return (
        <div className="w-full h-full border-box p-8">
            <div className="w-full h-full bg-white rounded-xl overflow-auto">
                <form onSubmit={handleSubmit} className="py-4 px-4">
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
                                            if (e.target.files) {
                                                setBanner(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </label>
                            )}
                        </div>
                        <div className="w-3/5 flex flex-col items-baseline">
                            <Title level={5}>Event Name</Title>
                            <Input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="w-3/5 flex flex-col items-baseline">
                            <Title level={5}>Description</Title>
                            <TextArea rows={4} placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="w-3/5 flex flex-col items-baseline">
                            <Title level={5}>Bounty</Title>
                            <InputNumber addonAfter="XP" value={bounty} onChange={(value) => setBounty(value || 0)} />
                        </div>
                        <div className="w-3/5 flex flex-col items-baseline">
                            <Title level={5}>Location</Title>
                            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="w-3/5 flex flex-col items-baseline">
                            <Title level={5}>Select Date</Title>
                            <RangePicker onChange={(dates) => {
                                if (dates && dates[0] && dates[1]) {
                                    setEventStart(dates[0].toDate());
                                    setEventEnd(dates[1].toDate());
                                }
                            }} />
                        </div>
                        <div className="">
                            <Title level={5}>Upload Gallery</Title>
                            <ImgCrop rotationSlider>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 5 && "+Upload Gallery"}
                                </Upload>
                            </ImgCrop>
                        </div>
                        {error && <p className="my-2 text-red-500">{error}</p>}
                        <Button
                            size={"large"}
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
