import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chip, Paper, Divider, LinearProgress } from "@material-ui/core";
import imageCompression from "browser-image-compression";
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import db, { storage } from "../../firebase";
import Styles from "./Style";
import swal from "@sweetalert/with-react";

const Form = () => {
  const classes = Styles();
  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const[ Like, setLike] = useState(0); // 좋아요 
  const currentDate = new Date(); // 현재 날짜
  const[category,setCategory] = useState(""); // 카테고리 

  const [uploadData, setUploadData] = useState({
    description: "",
    file: {
      type: "",
      name: "",
      data: "",
    },
  });

  const [ progress, setProgress] = useState("");


  const Categorys = (e) => {
    setCategory(e.target.value); 
};

  const uploadToFirebaseDB = (fileData) => { //봄동에 데이터를 업로드 하는 함수. 
    // 적어도 봄동에 이 구조로는 되어있어야 저장이 되고 업로드가 됨.
    // uploading to collection called posts
    
  
    
    // 봄동에 게시글 데이터 보내기
    db.collection("posts")
      .add({
        email: email,
        profile: photoURL,
        username: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        description: uploadData.description,
        fileType: uploadData.file.type,
        fileName: uploadData.file.name,
        fileData: fileData,
        Like : Like,
        category : category
      })
      .then(() => resetState());
  
  //-----------------------------------------------------------------------------------------
  
       // Spring boot board에 게시글 데이터 보내기
       fetch("http://localhost:8080/api/createboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          username: displayName,
          content: uploadData.description,
          profile: photoURL,
          fileData: fileData,
          fileName: uploadData.file.name,
          fileType: uploadData.file.type,
          timestamp: currentDate,
          Likes : Like,
          category : category
        }),
    })
        .then(response => {
            console.log(`response`, response);   
            // 201은 성공  실패하면 null return
            if (response.status === 201) {
                return response.json();     
            } else {
                return null;
            }
           
        })
  
  
  
    };
  
  const handleSubmitButton = (e) => {
    e.preventDefault();

    


    // verify atleast one of the input fields are not empyt
    if (uploadData.description || uploadData.file.data) {
      // if file input is true...upload the file to Fire-Store
      if (uploadData.file.data) {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(uploadData.file.data, "data_url");
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const value = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(value);
          },
          

          (error) => {
            alert(error);
          },

          () => {
            storage
              .ref("posts")
              .child(id)
              .getDownloadURL()
              .then((url) => uploadToFirebaseDB(url));
          }
        );

        // do not go further..
        return;
      }
      // if not file input provided
      uploadToFirebaseDB(uploadData.file.data);
    } else {
      swal("😕 Input field can not be empty");
    }
  };

  // if file name is too long.. compress it
  const fileNameCompressor = (str, limit) => { // 파일명 압축 함수.
    // 파일명이 너무 길 경우, 지정한 길이로 압축하여 반환합니다.
    let fileName = str;
    const arr = str.split(".");
    const name = arr[0];
    const ext = arr[arr.length - 1];

    if (name.length > limit) {
      fileName = name.substring(0, limit).trim() + "... ." + ext;
    }
    return fileName;
  };

  const imageUploadHandler = async (e, type) => { // 파일 업로드 핸들러
    const inputFile = e.target.files[0];
    const _inputFile = inputFile.type.split("/");
    const inputFileType = _inputFile[0];
    const inputFileExec = _inputFile[1];
    const inputFileName = fileNameCompressor(inputFile.name, 20);

    const fileSize = inputFile.size / (1024 * 1024);

    const acceptedImageFormats = ["png", "jpg", "jpeg", "gif"]; // 이미지 업로드 가능한 포맷
    const acceptedVideoFormats = ["mp4", "mkv", "3gp", "avi", "webm"]; // 동영상 업로드 가능한 포맷

    switch (type) {
      case "video":
        if (!acceptedVideoFormats.some((format) => format.includes(inputFileExec))) {
          swal("🔴 Please select video format of mp4 , mkv , av ");
          e.target.value = "";
          return;
        }
        if (fileSize > 10) {
          swal("🔴 Please select a video less than 10MB file size");
          e.target.value = "";
          return;
        }
        break;
      case "image":
        if (!acceptedImageFormats.some((format) => format.includes(inputFileExec))) {
          swal("🔴 Please select image format of png , jpg , jpeg , gif ");
          e.target.value = "";
          return;
        }
        if (fileSize > 2) {
          swal("🔴 Please select an image less than 2MB file size");
          e.target.value = "";
          return;
        }
        break;
      default:
        swal("😮 OOPS...!!! Invalid file format");
        e.target.value = "";
        return;
    }

    let compressedInputFile = inputFile;
    if (inputFileType === "image") {
      //compression algorithm
      const compressionOptions = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        compressedInputFile = await imageCompression(inputFile, compressionOptions);
      } catch (error) {
        alert(error);
      }
    }

    let inputFileDataBase64;
    const file = new FileReader();
    if (compressedInputFile) {
      file.onloadend = (fileLoadedEvent) => {
        inputFileDataBase64 = fileLoadedEvent.target.result;
        setUploadData({
          ...uploadData,
          file: {
            type: inputFileType,
            name: inputFileName,
            data: inputFileDataBase64,
          },
        });
      };
      file.readAsDataURL(compressedInputFile);
    }

    // clear the file input event value
    e.target.value = "";
  };

  const resetState = () => { // 상태 초기화 함수
    // 업로드 데이터와 진행률을 초기화 합니다.
    setUploadData({
      description: "",
      file: {
        type: "",
        name: "",
        data: "",
      },
    });
    setProgress("");
  };

  return ( // jsx 반환
    <Paper className={classes.upload}>
      <div className={classes.upload__header}>
        <Avatar src={photoURL} />
        <form className={classes.header__form} onSubmit={handleSubmitButton}>
          <input
            placeholder={`오늘은 어떤 내용을 공유할까요, ${displayName}님?`}
            value={uploadData.description}
            onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
          /> 
          {/* 위 input은 피드 TEXT입력 부분 */}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => imageUploadHandler(e, "image")}
          />
          {/* 위 input은 피드 이미지 업로드 부분, 아래 라벨의 htmlFor와 id값이 일치해야 업로드 내용이 나옴. */}
          <input
            id="upload-video" 
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => imageUploadHandler(e, "video")}
          />
            {/* <select value= {category} onChange={Categorys}>
                <option value="축구">축구</option>
                <option value="농구">농구</option>
                <option value="풋살">풋살</option>
                <option value="배드민턴">배드민턴</option>
            </select> */}
          
          {/* 위 input은 피드 동영상 업로드 부분 */}
          <button type="submit" >올리기</button>
          {/* POST버튼 */}
        </form>
      </div>
      {uploadData.file.name && !progress && (
        <div className={classes.selectedFile}>
          <Chip
            color="primary"
            size="small"
            onDelete={resetState}
            icon={uploadData.file.type === "image" ? <PhotoRoundedIcon /> : <VideocamRoundedIcon />}
            label={uploadData.file.name}
          />
        </div>
      )}
      {progress ? (
        <div className={classes.uploading}>
          <LinearProgress variant="determinate" value={progress} className={classes.progress} />
          <p>{progress} %</p>
        </div>
      ) : (
        ""
      )}
      <Divider />

      <div className={classes.upload__media}>
        <label htmlFor="upload-video" className={classes.media__options}>
          <VideocamRoundedIcon style={{ color: "red" }} />
          <h4>Video</h4>
        </label>
        <label htmlFor="upload-image" className={classes.media__options}>
          <PhotoRoundedIcon style={{ color: "green" }} />
          <h4>Photo</h4>
        </label>
        <div className={classes.media__options}>
          <EmojiEmotionsOutlinedIcon style={{ color: "orange" }} />
          <h4>Feeling/Activity</h4>
        </div>
      </div>
    </Paper>
  );
};

export default Form;
