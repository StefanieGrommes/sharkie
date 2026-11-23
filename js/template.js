function showHistory() {
  return `<h2 class="title">Deep under the waves, in the mysterious Coral Kingdom, lives a brave little shark named Sharkie.</h2>
        <p>
        Long ago, the Coral Kingdom was a place of peace and beauty...
        Puffer fishes gang swims across, blocking the path.
        Jelly fishes glow menacingly.
        Only one hero can save the ocean...
        Sharkie, the Ocean Guardian!
        </p>
        <h4 class="title">The Mission:</h4>
        <ul>
        <li>Collect coins to rebuild the Coral Kingdom </li>
        <li>Collect hearts to regain energy. </li>
        <li>Collect poison bottles in order to build posion bubbles. </li>
        <li>Defeat the enemies by throwing bubbles or slapping them with your fin.</li>
        </ul>
        <h2 class="title">Are you ready to help Sharkie get back the peace?</h2>`;
}

function showImprint() {
  return `<h2>Imprint</h2>
            <p>
                Stefanie Grommes<br />
                Offenbachstr. 6<br />
                53359 Rheinbach<br />
                Telefon: +49 (0) 1785825548<br />
                E-Mail: steffi.grommes@web.de
            </p>
            <h3>Berufsbezeichnung und berufsrechtliche Regelungen</h3>
            <p>
                Berufsbezeichnung:<br />
                Software Developer
            </p>
            <h3>
                Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
            </h3>
            <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
            </p>
            <p>
                Quelle:
                <a
                href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a>
            </p>
            `;
}

function showInstructions() {
  return `<ol class="controls-list">
                    <h2>Controls</h2>
                    <ul>
                        <h3> MOVING </h3>
                        <li>
                        <span>Move left</span>
                        <div class="preview-btn">←</div>
                        </li>
                        <li>
                        <span>Move right</span>
                        <div class="preview-btn">→</div>
                        </li>
                        <li>
                        <span>Move up</span>
                        <div class="preview-btn">↑</div>
                        </li>
                        <li>
                        <span>Move down</span>
                        <div class="preview-btn">↓</div>
                        </li>
                    </ul>
                    <ul>
                        <h3> ATTACKING</h3>
                        <li>
                        <span>Fin Slap</span>
                        <div class="preview-btn">F</div>
                        </li>
                        <li>
                        <span>Bubble Attack</span>
                        <div class="preview-btn">B</div>
                        </li>
                        <li>
                        <span>Poison Attack</span>
                        <div class="preview-btn">Space</div>
                        </li>
                    </ul>
                    <h2>Settings</h2>
                    <ul class="menu-settings">
                        <li><button class="game-btn fullscreen-btn" id="menu-fullscreen-btn">
                            <img class="fullscreen-img" src="../img/7.Buttons/fullscreen.png" alt="fullscreen image">
                        </button></li>
                        <li><button class="game-btn volume-btn-slider"><input type="range" id="volumeSlider" min="0" max="1" step="0.1"
                            value="${masterVolume}" class="volume-slider" oninput="changeVolume(this.value)">
                        </button></li>
                        <li><button class="game-btn volume-btn" id="menu-volume-btn">
                            <img class="img-volume" src="../img/7.Buttons/volume.png" alt="sound image">
                        </button></li>
                    </ul>
                    </ol>`;
}
