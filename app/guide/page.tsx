import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-body">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-pixel text-4xl md:text-6xl text-neon-cyan mb-8 text-center drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
          INSTALLATION <span className="text-neon-pink">GUIDE</span>
        </h1>

        <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
          Not sure how to set up your new 4K wallpaper? Follow our step-by-step instructions for every device.
        </p>

        <div className="space-y-12">
          {/* Windows Guide */}
          <section className="bg-card-bg p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h2 className="font-pixel text-3xl text-neon-cyan mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan text-dark-bg w-10 h-10 flex items-center justify-center rounded-lg">1</span>
              Windows (PC)
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>For the best results on Windows 10 or 11:</p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Download your favorite wallpaper from our gallery by clicking the <span className="text-neon-pink">Download</span> icon.</li>
                <li>Locate the file in your <strong>Downloads</strong> folder.</li>
                <li>Right-click the image and select <strong>&quot;Set as desktop background&quot;</strong>.</li>
                <li><strong>Pro Tip:</strong> If the image looks blurry, go to <em>Settings &gt; Personalization &gt; Background</em> and ensure the fit is set to <strong>&quot;Fill&quot;</strong>. Windows sometimes compresses images; for the highest quality, we recommend using a free tool like <span className="text-neon-cyan italic">Lively Wallpaper</span> for static and live wallpapers.</li>
              </ol>
            </div>
          </section>

          {/* Android Guide */}
          <section className="bg-card-bg p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h2 className="font-pixel text-3xl text-neon-pink mb-6 flex items-center gap-3">
              <span className="bg-neon-pink text-white w-10 h-10 flex items-center justify-center rounded-lg">2</span>
              Android Devices
            </h2>
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Long-press the wallpaper image in our gallery and select <strong>&quot;Download Image&quot;</strong>.</li>
                <li>Open your <strong>Gallery</strong> or <strong>Photos</strong> app.</li>
                <li>Find the image and tap the <strong>three dots (Menu)</strong>.</li>
                <li>Select <strong>&quot;Use as&quot;</strong> or <strong>&quot;Set as wallpaper&quot;</strong>.</li>
                <li>Choose whether you want it on your <strong>Home Screen</strong>, <strong>Lock Screen</strong>, or both.</li>
              </ol>
            </div>
          </section>

          {/* iPhone Guide */}
          <section className="bg-card-bg p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h2 className="font-pixel text-3xl text-neon-purple mb-6 flex items-center gap-3">
              <span className="bg-neon-purple text-white w-10 h-10 flex items-center justify-center rounded-lg">3</span>
              iOS (iPhone/iPad)
            </h2>
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Tap the wallpaper to open the full-view, then long-press and select <strong>&quot;Save to Photos&quot;</strong>.</li>
                <li>Open the <strong>Photos</strong> app and select the image.</li>
                <li>Tap the <strong>Share</strong> button (square with an arrow).</li>
                <li>Scroll down and tap <strong>&quot;Use as Wallpaper&quot;</strong>.</li>
                <li>Pinch to adjust the crop and tap <strong>&quot;Add&quot;</strong> in the top right corner.</li>
              </ol>
            </div>
          </section>

          {/* Video Wallpapers Guide */}
          <section className="bg-neon-cyan/5 p-8 rounded-2xl border-2 border-neon-cyan/20">
            <h2 className="font-pixel text-2xl text-white mb-4">Setting up Live (Video) Wallpapers</h2>
            <p className="text-gray-400 mb-4">
              Live wallpapers require a bit more setup since Windows and iOS don&apos;t support MP4 backgrounds natively.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li><strong>Windows:</strong> Use <a href="https://rocksdanister.github.io/lively/" target="_blank" className="text-neon-cyan underline">Lively Wallpaper</a> (Open Source). Just drag the .mp4 file into the app!</li>
              <li><strong>Android:</strong> Most modern Android phones allow you to set a video as a lock screen directly from the Gallery menu.</li>
              <li><strong>iOS:</strong> Use a tool like &quot;intoLive&quot; to convert the video into a Live Photo, which can then be set as an animated Lock Screen (iOS 16+ features may vary).</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
