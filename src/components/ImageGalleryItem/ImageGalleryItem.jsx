import React, { useState } from 'react';
import { ModalWindow } from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';


export const ImgGalleryItem = ({image} ) => {
 const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // this.setState({ isModalOpen: true }); // відкриття модального вікна
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // this.setState({ isModalOpen: false }); // закриття модального вікна
  };

    
    return (
      <>
        <Item>
          <Img
            src={image.webformatURL}
            alt={image.tags}
            onClick={openModal}
          />
          <ModalWindow
            isOpen={isModalOpen}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
            largeImageURL={image.largeImageURL}
          tags={image.tags}
          >  
          <img src={image.largeImageURL} alt={image.tags} />        
          </ModalWindow>
        </Item>
      </>
    );
  
}
