import React, { useState, useEffect, useCallback } from "react";
import "../styles/components/ProjectModal.css"; // Import CSS for modal styling
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import { BiLinkExternal } from "react-icons/bi"; // Import external link icon

// ProjectModal Component: Handles modal display for project details and image gallery
const ProjectModal = ({ show, onClose, project }) => {

    // State to manage the currently enlarged image index
    const [enlargedImageIndex, setEnlargedImageIndex] = useState(null);
    // Set gallery images to the project's gallery or fallback to the main image

    const galleryImages = (project?.gallery && project.gallery.length > 0)
        ? project.gallery
        : [project?.imgUrl || ""];


    /**
     * Prevents the main webpage from scrolling when the modal is open.
     * Sets the `overflow` property of the body dynamically based on `show`.
     */
    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto"; // Reset overflow when component unmounts
        };
    }, [show]);

    /**
     * Handles keyboard navigation for enlarged image.
     * ArrowRight: Goes to the next image.
     * ArrowLeft: Goes to the previous image.
     */
    const handleKeyDown = useCallback(
        (e) => {
            if (enlargedImageIndex !== null) {
                if (e.key === "ArrowRight") {
                    // Move to next image, wrap to start if at the end
                    setEnlargedImageIndex((prev) => (prev + 1) % galleryImages.length);
                } else if (e.key === "ArrowLeft") {
                    // Move to previous image, wrap to end if at the start
                    setEnlargedImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                    );
                }
            }
        },
        [enlargedImageIndex, galleryImages.length]
    );

    // Attach and remove the event listener for keyboard navigation
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Close enlarged image overlay
    const closeEnlargedImage = () => setEnlargedImageIndex(null);

    /**
     * Handles swipe gestures for mobile navigation.
     * `left`: Go to next image.
     * `right`: Go to previous image.
     */
    const handleSwipe = (direction) => {
        if (direction === "left") {
            setEnlargedImageIndex((prev) => (prev + 1) % galleryImages.length);
        } else {
            setEnlargedImageIndex((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1
            );
        }
    };

    // Return nothing if modal is not visible or project data is missing
    if (!show || !project) return null;

    return (
        <section id="modal">
            {/* Modal Overlay */}
            <div className="custom-modal-overlay" onClick={onClose}>
                <div
                    className="custom-modal-container"
                    onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                >
                    {/* Header Section */}
                    <div className="custom-modal-header">
                        <h2>{project.title}</h2> {/* Project Title */}
                        <span className="close-button" onClick={onClose}>
                            &times; {/* Close Button */}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="custom-modal-content">
                        {/* Left: Project Description */}
                        <div className="custom-modal-description">
                            <h4>Description</h4>
                            <div className="description">{project.fullDescription}</div>
                            {/* Buttons for external links */}
                            <div className="custom-modal-buttons">
                                {/* Visit Project Button */}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="custom-button primary"
                                    >
                                        <BiLinkExternal className="button-icon" /> Visit Project
                                    </a>
                                )}
                                {/* GitHub Link Button */}
                                <a
                                    href="https://github.com/arash-esfandiari"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="custom-button secondary"
                                >
                                    <FaGithub className="button-icon" /> View on GitHub
                                </a>
                            </div>
                        </div>

                        {/* Right: Project Main Image */}
                        <div className="custom-modal-image">
                            <img src={project.imgUrl} alt="Project" />
                        </div>
                    </div>

                    {/* Image Gallery Section */}
                    <div className="custom-inline-gallery">
                        <h4>Project Gallery</h4>
                        <div className="gallery-images">
                            {galleryImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="gallery-image"
                                    onClick={() => setEnlargedImageIndex(index)} // Enlarge image on click
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enlarged Image Overlay with Navigation */}
            {enlargedImageIndex !== null && (
                <div
                    className="image-enlarge-overlay"
                    onClick={closeEnlargedImage} // Close enlarged image
                    onTouchStart={(e) => (e.startX = e.touches[0].clientX)} // Track touch start position
                    onTouchEnd={(e) => {
                        // Detect swipe direction
                        const deltaX = e.changedTouches[0].clientX - e.startX;
                        if (deltaX < -50) handleSwipe("left"); // Swipe left to go to next image
                        else if (deltaX > 50) handleSwipe("right"); // Swipe right to go to previous image
                    }}
                >
                    {/* Left Navigation Arrow */}
                    <FaChevronLeft
                        className="gallery-nav left"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSwipe("right");
                        }}
                    />
                    {/* Enlarged Image */}
                    <img
                        src={galleryImages[enlargedImageIndex]}
                        alt="Enlarged"
                        className="enlarged-image"
                    />
                    {/* Right Navigation Arrow */}
                    <FaChevronRight
                        className="gallery-nav right"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSwipe("left");
                        }}
                    />
                </div>
            )}
        </section>
    );
};

export default ProjectModal;