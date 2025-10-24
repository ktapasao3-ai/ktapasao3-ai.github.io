/**
 * Simple Gallery with Direct Video Embed
 */

const albums = {
    'school-events': {
        title: 'School Events',
        icon: 'fas fa-calendar-alt',
        images: [
            { src: 'assets/images/gallery/school-event1.jpg', caption: 'LLCC Night 2024' },
            { src: 'assets/images/gallery/school-event2.jpg', caption: 'LLCC Night 2024' },
            { src: 'assets/images/gallery/school-event3.jpg', caption: 'Christmas Party 2024' },
            { src: 'assets/images/gallery/school-event4.jpg', caption: 'PE Culminating Activity 2025' },
            { src: 'assets/images/gallery/school-event5.jpeg', caption: 'ROTC RAATI 2024' },
           
            // Add more images here
        ]
    },
    'classroom': {
        title: 'Classroom Memories',
        icon: 'fas fa-chalkboard-teacher',
        images: [
            { src: 'assets/images/gallery/classroom1.jpg', caption: 'Senior High School' },
            { src: 'assets/images/gallery/classroom2.jpeg', caption: 'Lab Session' },
            { src: 'assets/images/gallery/classroom3.jpeg', caption: 'CAS Building Hallway' },
           
            // Add more images here
        ]
    },
    'friends': {
        title: 'Friends & Fun',
        icon: 'fas fa-users',
        images: [
            { src: 'assets/images/gallery/study-group1.jpg', caption: 'Hangout with Friends' },
            { src: 'assets/images/gallery/study-group3.jpeg', caption: 'Sleeping in Class' },
            
            // Add more images here
        ]
    },
    'projects': {
        title: 'Projects & Labs',
        icon: 'fas fa-laptop-code',
        images: [
            { src: 'assets/images/gallery/study-group2.jpeg', caption: 'Final Project Demo' },
            // Add more images here
        ]
    },
    'graduation': { 
        title: 'Graduation Moments', 
        icon: 'fas fa-graduation-cap', 
        images: [ 
            { src: 'assets/images/gallery/graduation1.jpg', caption: 'Graduation Day 2022' }, 
            { src: 'assets/images/gallery/graduation2.jpg', caption: 'With Family' }, 
            { src: 'assets/images/gallery/graduation3.jpg', caption: 'Graduation 2016' }
            
            // Add more images here 
        ] 
    },
    'videos': {
        title: 'Videos',
        icon: 'fas fa-film',
        videos: [
            { 
            src: 'assets/videos/project-video.mp4', 
            caption: 'Group Activity',
            poster:'assets/images/gallery/videos/video-thumb1.jpg' },
            { src: 'assets/videos/project-video2.mp4', 
            caption: 'Individual Activity',
            poster:'assets/images/gallery/videos/video-thumb2.jpg' },
            { src: 'assets/videos/project-video3.mp4', 
            caption: 'Group Video Presentation',
            poster:'assets/images/gallery/videos/video-thumb3.jpg' },
            { src: 'assets/videos/project-video4.mp4', 
            caption: 'Mini Vlog',
            poster:'assets/images/gallery/videos/video-thumb4.jpg' },
        ]
    }
};

function openAlbum(albumId) {
    const album = albums[albumId];
    if (!album) return;

    document.getElementById('albumTitle').innerHTML = 
        `<i class="${album.icon} me-2"></i>${album.title}`;

    const albumImagesDiv = document.getElementById('albumImages');
    albumImagesDiv.innerHTML = '';

    // Handle videos with GRID layout (like CapCut)
    if (albumId === 'videos' && album.videos) {
        album.videos.forEach((video) => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3 mb-3';  // ⭐ Smaller columns, tighter grid
            
            col.innerHTML = `
                <div class="video-grid-item">
                    <div class="video-thumbnail-wrapper">
                        <img src="${video.poster}" alt="${video.caption}" class="video-thumbnail-img">
                        <div class="video-play-button">
                            <i class="fas fa-play-circle fa-3x"></i>
                        </div>
                    </div>
                    <p class="video-caption">
                        <i class="fas fa-video me-1"></i>${video.caption}
                    </p>
                </div>
            `;
            
            // Add click event to play video
            col.addEventListener('click', function() {
                playVideoInModal(video.src, video.caption, video.poster);
            });
            
            albumImagesDiv.appendChild(col);
        });
    } else {
        // Handle regular images
        album.images.forEach((image) => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            
            col.innerHTML = `
                <div class="album-thumbnail" onclick="openLightbox('${image.src}')">
                    <img src="${image.src}" alt="${image.caption}" class="img-fluid">
                </div>
                <p class="text-center mt-2 small">${image.caption}</p>
            `;
            
            albumImagesDiv.appendChild(col);
        });
    }

    new bootstrap.Modal(document.getElementById('albumModal')).show();
}

// New function to play video in fullscreen-style modal
function playVideoInModal(videoSrc, caption, poster) {
    const albumModal = bootstrap.Modal.getInstance(document.getElementById('albumModal'));
    if (albumModal) albumModal.hide();
    
    // Create or update video modal content
    let videoModalEl = document.getElementById('videoPlayModal');
    if (!videoModalEl) {
        const modalHTML = `
            <div class="modal fade" id="videoPlayModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content bg-dark">
                        <div class="modal-header border-0">
                            <h5 class="modal-title text-white">
                                <i class="fas fa-video me-2"></i><span id="videoPlayTitle">${caption}</span>
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-0">
                            <video id="videoPlayPlayer" class="w-100" controls poster="${poster}">
                                <source src="${videoSrc}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        videoModalEl = document.getElementById('videoPlayModal');
    } else {
        document.getElementById('videoPlayTitle').textContent = caption;
        const player = document.getElementById('videoPlayPlayer');
        player.src = videoSrc;
        player.poster = poster;
    }
    
    const videoModal = new bootstrap.Modal(videoModalEl);
    videoModal.show();
    
    // Auto-play when modal opens
    videoModalEl.addEventListener('shown.bs.modal', function () {
        document.getElementById('videoPlayPlayer').play();
    });
    
    // Reset when modal closes
    videoModalEl.addEventListener('hidden.bs.modal', function () {
        const player = document.getElementById('videoPlayPlayer');
        player.pause();
        player.currentTime = 0;
    });
}

function openLightbox(imageSrc) {
    document.getElementById('lightboxImage').src = imageSrc;
    new bootstrap.Modal(document.getElementById('lightboxModal')).show();
}

console.log('Gallery loaded successfully!');
