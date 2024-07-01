import React, { useState, useEffect } from "react";
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
  const { displayName, photoURL } = useSelector((state) => state.user);

  const [uploadData, setUploadData] = useState({
    description: "",
    file: {
      type: "",
      name: "",
      data: "",
    },
  });

  const [progress, setProgress] = useState("");

// 깃플챗 form에서만 작동할 수 있도록 추가
  // Gitplechat 스크립트를 컴포넌트가 마운트 될 때 추가하고 언마운트 될 때 제거하는 useEffect 추가
  useEffect(() => {
    // Gitplechat 스크립트 추가
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      window.GitpleConfig = {"appCode":"G7qJfFaCWBYX7XEOPExHBV7QRs6g13"};
      !function(){
        function e(){
          function e(){
            var e=t.contentDocument,
                a=e.createElement("script");
            a.type="text/javascript", a.async=!0, a.src=window[n]&&window[n].url?window[n].url+"/inapp-web/gitple-loader.js":"https://app.gitple.io/inapp-web/gitple-loader.js", a.charset="UTF-8", e.head&&e.head.appendChild(a)
          }
          var t=document.getElementById(a);
          t||((t=document.createElement("iframe")).id=a, t.style.display="none", t.style.width="0", t.style.height="0", t.addEventListener?t.addEventListener("load", e, !1):t.attachEvent?t.attachEvent("onload", e):t.onload=e, document.body.appendChild(t))
        }
        var t=window,
            n="GitpleConfig",
            a="gitple-loader-frame";
        if(!window.Gitple){
          document;
          var i=function(){
            i.ex&&i.ex(arguments)
          };
          i.q=[], i.ex=function(e){
            i.processApi?i.processApi.apply(void 0, e):i.q&&i.q.push(e)
          }, window.Gitple=i, t.attachEvent?t.attachEvent("onload", e):t.addEventListener("load", e, !1)
        }
      }();
      Gitple('boot');
    `;

    document.body.appendChild(script);

    return () => {
      // Gitplechat 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  const uploadToFirebaseDB = (fileData) => { //봄동에 데이터를 업로드 하는 함수. 
    // 적어도 봄동에 이 구조로는 되어있어야 저장이 되고 업로드가 됨.
    // uploading to collection called posts
    db.collection("posts")
      .add({
        profile: photoURL,
        username: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        description: uploadData.description,
        fileType: uploadData.file.type,
        fileName: uploadData.file.name,
        fileData: fileData,
      })
      .then(() => resetState());
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
