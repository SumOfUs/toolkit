import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import S3 from 'aws-sdk/clients/s3';


class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      uploading: false,
    }
  }

  upload(data){

    Auth.currentCredentials()
      .then(credentials => {
        const key = `quiz/${this.props.quizId}/${this.props.objectKey}/raw/${data.name}`;

        let params = {
          Bucket: "sumofus.org.quiz",
          Key: key,
          Body: data
        };

        let s3 = new S3({
          apiVersion: '2013-04-01',
          region: 'us-west-2',
          credentials: Auth.essentialCredentials(credentials)
        });

        var request = s3.putObject(params);

        request.on('httpUploadProgress', function (progress) {
          const { loaded, total } = progress;

          let percentage = parseInt(loaded/total*100, 10);

          let newState = {
            progress: percentage
          };

          if(percentage >= 100){
            console.log("DONE", {section: this.props.section, id: this.props.id, path: data.name});
            newState.uploading = false;
            this.props.saveImage({section: this.props.section, id: this.props.id, path: data.name});
          }

          this.setState(newState);
        }.bind(this));

        request.send();
        this.setState({uploading: true});
      });
  }

  renderPicker() {
    return (
      this.state.uploading ?
        <progress className="progress is-small is-info" value={this.state.progress} max="100"></progress>
          :
      <div className="file is-boxed">
      <label className="file-label">
        <input onChange={ e => {
            this.upload(e.target.files[0]);
          }} className="file-input" type="file" name="resume" />
        <span className="file-cta">
          <span className="file-label">
            Choose a photo
          </span>
        </span>
      </label>
      </div>

    )
  }
  renderPicker2() {
    return (
      this.state.uploading ?
      <progress className="progress is-small is-info" value={this.state.progress} max="100"></progress>
        : <PhotoPicker
        onPick={
          data => {
            this.upload(data)
          }
        }/>
    )
  }

  renderImage() {
    if(!this.props.image) return ''

    const key = `quiz/${this.props.quizId}/${this.props.objectKey}/raw/${this.props.image}`;
    const path = `https://s3-us-west-2.amazonaws.com/sumofus.org.quiz/${key}`;

    return (<p><img alt='quiz' width='100' height='100' src={path} /></p>);
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        {this.renderPicker()}
      </div>
    );
  }
}

export default ImageUpload;
