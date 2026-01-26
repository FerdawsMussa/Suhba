const surahSelect = document.getElementById("surahSelect");
const audioPlayer = document.getElementById("quranAudio");
const readingArea = document.getElementById("readingArea");

/* Load Surah List */
async function loadSurahList() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await res.json();

    surahSelect.innerHTML =
      '<option value="">-- Choose a Surah --</option>';

    data.data.forEach((surah) => {
      const option = document.createElement("option");
      option.value = surah.number;
      option.textContent = `${surah.number}. ${surah.englishName} (${surah.name})`;
      surahSelect.appendChild(option);
    });
  } catch {
    surahSelect.innerHTML = "<option>Error loading list</option>";
  }
}

/* On Surah Change */
surahSelect.addEventListener("change", async (e) => {
  const surahNumber = e.target.value;
  if (!surahNumber) return;

  readingArea.innerHTML =
    '<div class="placeholder-text">Loading Surah...</div>';

  try {
    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`
    );
    const arabicData = await arabicRes.json();

    const transRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`
    );
    const transData = await transRes.json();

    displaySurah(arabicData.data.ayahs, transData.data.ayahs);
  } catch {
    readingArea.innerHTML =
      '<div class="placeholder-text">Error loading content</div>';
  }
});

/* Display Surah */
function displaySurah(arabicAyahs, translationAyahs) {
  audioPlayer.src = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahSelect.value}.mp3`;
  audioPlayer.play();

  readingArea.innerHTML = "";

  arabicAyahs.forEach((ayah, i) => {
    const block = document.createElement("div");
    block.className = "ayah-block";

    const arabic = document.createElement("p");
    arabic.className = "ayah-text";
    arabic.innerHTML = `<span class="ayah-num">${ayah.numberInSurah}</span> ${ayah.text}`;

    const translation = document.createElement("p");
    translation.className = "ayah-translation";
    translation.textContent = translationAyahs[i].text;

    block.appendChild(arabic);
    block.appendChild(translation);
    readingArea.appendChild(block);
  });
}

loadSurahList();
