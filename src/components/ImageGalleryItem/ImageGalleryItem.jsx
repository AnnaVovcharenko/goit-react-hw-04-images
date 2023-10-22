import React, { Component } from 'react';
import { ModalWindow } from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';
export class ImgGalleryItem extends Component {
  state = {
    isModalOpen: false, //Зберігає стан модального вікна (відчинено чи закрито)
  };
  openModal = () => {
    this.setState({ isModalOpen: true }); // відкриття модального вікна
  };
  closeModal = () => {
    this.setState({ isModalOpen: false }); // закриття модального вікна
  };

  render() {
    const { isModalOpen } = this.state; //Отримуємо поточне значення isModalOpen зі стану
    const { image } = this.props; // Отримуємо переданий пропс
    
    return (
      <>
        <Item>
          <Img
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.openModal}
          />
          <ModalWindow
            isOpen={isModalOpen}
            contentLabel="Example Modal"
            onRequestClose={this.closeModal}
            largeImageURL={image.largeImageURL}
          tags={image.tags}
          >  
          <img src={image.largeImageURL} alt={image.tags} />        
          </ModalWindow>
        </Item>
      </>
    );
  }
}
