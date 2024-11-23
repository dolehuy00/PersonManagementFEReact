import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import axios from 'axios';

const SearchWithPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledInput, setDisabledInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Toggle Popup
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout
    setTypingTimeout(
      setTimeout(() => {
        fetchSearchResults(value);
      }, 1000)
    );
  };

  // Fetch search results from API
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.example.com/search`, {
        params: { query },
      });
      setSearchResults(response.data); // Assume API returns an array of { id, name }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Handle selection of a search result
  const handleSelectResult = (result) => {
    setDisabledInput(result.name); // Update the disabled input
    toggleModal(); // Close modal
  };

  return (
    <div className="container mt-4">
      {/* Disabled Input */}
      <Input
        type="text"
        value={disabledInput}
        disabled
        placeholder="Selected value will appear here"
      />

      {/* Button to open modal */}
      <Button color="primary" className="mt-2" onClick={toggleModal}>
        Search Here
      </Button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Search</ModalHeader>
        <ModalBody>
          {/* Input for search */}
          <Input
            type="text"
            placeholder="Type to search..."
            value={searchValue}
            onChange={handleSearchChange}
          />

          {/* Display search results */}
          <ListGroup className="mt-3">
            {searchResults.map((result) => (
              <ListGroupItem
                key={result.id}
                tag="button"
                action
                onClick={() => handleSelectResult(result)}
              >
                {result.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SearchWithPopup;
