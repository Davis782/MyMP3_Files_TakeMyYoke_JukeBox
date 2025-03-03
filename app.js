function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('music');
        const [selectedFolder, setSelectedFolder] = React.useState('');
        const [content, setContent] = React.useState('');
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
        const [isAutoplayEnabled, setIsAutoplayEnabled] = React.useState(false);
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
        const pages = ['music', 'pictures'];
        const cashAppUsername = 'YourCashAppUsername';

        // Keep the existing content objects
        const lyricsContent = {
            song1: `Song Title: Mountain Dreams
Artist: The Wanderers
Album: Nature's Symphony
Year: 2023

Verse 1:
Standing on the mountain peak
Watching as the new day breaks
Golden light upon my face
Finding peace in nature's grace

Chorus:
In these mountain dreams
Nothing's what it seems
Every breath I take
Shows me what's at stake
In these mountain dreams

Verse 2:
Valley stretches down below
Painted by the morning glow
Every step along this trail
Tells another mountain tale

[Bridge]
Higher and higher we climb
Leaving our worries behind
Nature shows us the way
On this perfect mountain day

(Repeat Chorus)

© 2023 The Wanderers Music`,
            song2: `Song Title: Ocean Waves
Artist: The Wanderers
Album: Nature's Symphony
Year: 2023

Verse 1:
Waves crash on the shore tonight
Under stars that shine so bright
Salt air fills my lungs with peace
As the tide brings sweet release

Chorus:
Ocean waves, carry me home
Through the seas where I roam
Every wave brings something new
Under skies of deepest blue

Verse 2:
Seabirds glide on gentle breeze
Dancing with the evening seas
Stories in the sand below
Secrets that the ocean knows

[Bridge]
Let the current take control
Let the ocean heal my soul
In this moment, I am free
One with sky and one with sea

(Repeat Chorus)

© 2023 The Wanderers Music`,
            song3: `Song Title: Forest Rain
Artist: The Wanderers
Album: Nature's Symphony
Year: 2023

Verse 1:
Raindrops falling through the trees
Nature's gentle symphony
Green leaves glistening in the light
Making everything feel right

Chorus:
Forest rain, wash away
All my troubles of today
Every drop a healing sound
Peace in nature can be found

Verse 2:
Mist rising from the ground
Life awakening all around
Ancient trees stand tall and strong
While we sing our forest song

[Bridge]
In this moment, time stands still
As the rain falls on the hill
Nature's wisdom shows the way
On this perfect rainy day

(Repeat Chorus)

© 2023 The Wanderers Music`
        };

        const pictureDescriptions = {
            picture1: `Mountain Sunrise
Location: Rocky Mountains, Colorado
Date: October 15, 2023

A breathtaking view of snow-capped mountains during sunrise. The golden light bathes the peaks in warm hues while the valley below remains in cool shadows. This image captures the majestic scale of nature and the peaceful solitude of early morning in the mountains.

Technical Details:
- Photographer: Jane Smith
- Camera: Sony A7R IV
- Lens: 16-35mm f/2.8 GM
- Settings: f/11, 1/125s, ISO 100
- Time: 5:45 AM
- Elevation: 12,000 ft`,
            picture2: `Ocean Sunset
Location: Pacific Coast Highway, California
Date: July 23, 2023

A stunning California sunset captured along the iconic Pacific Coast Highway. The sun dips below the horizon, painting the sky in brilliant shades of orange, pink, and purple. The rocky coastline provides a dramatic foreground, while the peaceful ocean stretches endlessly toward the horizon.`,
            picture3: `Forest Waterfall
Location: Olympic National Park, Washington
Date: May 12, 2023

A mesmerizing capture of a hidden waterfall in the heart of Olympic National Park's temperate rainforest. The water cascades down moss-covered rocks, surrounded by lush ferns and ancient trees. The long exposure creates a silky smooth effect on the falling water.`
        };

        const musicFolders = [
            {
                name: 'song1',
                mediaFile: { path: 'mp3_files/song1/song1.mp3' },
                contentFile: { path: 'mp3_files/song1/lyrics.txt' }
            },
            {
                name: 'song2',
                mediaFile: { path: 'mp3_files/song2/song2.mp3' },
                contentFile: { path: 'mp3_files/song2/lyrics.txt' }
            },
            {
                name: 'song3',
                mediaFile: { path: 'mp3_files/song3/song3.mp3' },
                contentFile: { path: 'mp3_files/song3/lyrics.txt' }
            }
        ];

        const pictureFolders = [
            {
                name: 'picture1',
                mediaFile: { path: 'pictures/picture1/image.png' },
                contentFile: { path: 'pictures/picture1/description.txt' }
            },
            {
                name: 'picture2',
                mediaFile: { path: 'pictures/picture2/image.png' },
                contentFile: { path: 'pictures/picture2/description.txt' }
            },
            {
                name: 'picture3',
                mediaFile: { path: 'pictures/picture3/image.png' },
                contentFile: { path: 'pictures/picture3/description.txt' }
            }
        ];

        const handlePageChange = (page) => {
            setCurrentPage(page);
            setSelectedFolder('');
            setContent('');
            setIsAutoplayEnabled(false);
        };

        const handleFolderChange = (folderName) => {
            setSelectedFolder(folderName);
            if (currentPage === 'music') {
                setContent(lyricsContent[folderName] || '');
                setCurrentSongIndex(musicFolders.findIndex(f => f.name === folderName));
            } else {
                setContent(pictureDescriptions[folderName] || '');
            }
        };

        const handleAutoplayToggle = () => {
            if (!isAutoplayEnabled) {
                setShowPaymentModal(true);
            } else {
                setIsAutoplayEnabled(false);
            }
        };

        const handlePaymentComplete = () => {
            setShowPaymentModal(false);
            setIsAutoplayEnabled(true);
        };

        const handlePaymentSkip = () => {
            setShowPaymentModal(false);
            setIsAutoplayEnabled(true);
        };

        const handleSongEnd = () => {
            if (isAutoplayEnabled && currentPage === 'music') {
                const nextIndex = (currentSongIndex + 1) % musicFolders.length;
                setCurrentSongIndex(nextIndex);
                const nextSong = musicFolders[nextIndex];
                handleFolderChange(nextSong.name);
            }
        };

        const handleLogin = (success) => {
            setIsLoggedIn(success);
            setIsSidebarOpen(false);
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
        };

        return (
            <div className="container mx-auto px-4" data-name="app-container">
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsSidebarOpen(true)}
                    data-name="sidebar-toggle"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {isLoggedIn && (
                    <div data-name="admin-view">
                        <AdminPanel onLogout={handleLogout} />
                        <hr className="my-8" />
                    </div>
                )}

                <Navigation
                    currentPage={currentPage}
                    pages={pages}
                    mediaType={currentPage === 'music' ? 'Song' : 'Picture'}
                    mediaFiles={currentPage === 'music' ? musicFolders : pictureFolders}
                    onPageChange={handlePageChange}
                    onMediaChange={handleFolderChange}
                />

                <div className="mt-8" data-name="content-container">
                    {selectedFolder && currentPage === 'music' && (
                        <div data-name="music-player-container">
                            <div className="autoplay-toggle" data-name="autoplay-toggle">
                                <input
                                    type="checkbox"
                                    id="autoplay"
                                    checked={isAutoplayEnabled}
                                    onChange={handleAutoplayToggle}
                                />
                                <label htmlFor="autoplay">Enable Autoplay</label>
                            </div>
                            <AudioPlayer
                                audioFile={musicFolders.find(f => f.name === selectedFolder)?.mediaFile.path}
                                onTimeUpdate={(time) => console.log('Current time:', time)}
                                isAutoplayEnabled={isAutoplayEnabled}
                                onSongEnd={handleSongEnd}
                            />
                            {content && <ContentViewer content={content} />}
                        </div>
                    )}

                    {selectedFolder && currentPage === 'pictures' && (
                        <div data-name="picture-viewer-container">
                            <ImageViewer
                                imagePath={pictureFolders.find(f => f.name === selectedFolder)?.mediaFile.path}
                            />
                            {content && <ContentViewer content={content} />}
                        </div>
                    )}

                    <DonationButton cashAppUsername={cashAppUsername} />
                </div>

                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={handlePaymentComplete}
                    onSkip={handlePaymentSkip}
                    cashAppUsername={cashAppUsername}
                />

                <a
                    href="https://gamma.app/docs/Interactive-Media-Player-and-Image-Carousel-hzry2ujorx6w4al/preview?mode=doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                    data-name="info-link"
                >
                    <i className="fas fa-info-circle"></i>
                    More Information
                </a>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}



