const DEFAULT_BACKGROUNDS = [

  {
    id: "rain-room",
    name: "Rainy Room",
    src: "assets/bg-rain-room.jpg"
  },

  {
    id: "sunset-lake",
    name: "Golden Sunset",
    src: "assets/bg-sunset-lake.jpg"
  },

  {
    id: "cherry-park",
    name: "Cherry Blossom Park",
    src: "assets/bg-cherry-park.jpg"
  },

  {
    id: "rain-city",
    name: "Rainy City",
    src: "assets/bg-rain-city.jpg"
  },

  {
    id: "autumn-bench",
    name: "Autumn Bench",
    src: "assets/bg-autumn-bench.jpg"
  },

  {
    id: "rooftop-city",
    name: "Rooftop City",
    src: "assets/bg-rooftop-city.jpg"
  },

  {
    id: "dream-ocean",
    name: "Dream Ocean",
    src: "assets/bg-dream-ocean.jpg"
  }

];


const STORY = [

  {
    title: "The Empty Room",
    duration: 6,
    background: "rain-room",
    characters: "beeshal",
    camera: "Slow cinematic push-in",
    emotion: "Melancholic",

    prompt:
      "Open with Beeshal sitting alone in a quiet room during a rainy evening. His guitar rests beside him. Blue moonlight enters through the window. He looks at an old memory of Samzana, pauses silently, then picks up his guitar. Slow camera push-in toward his emotional face. Rain and soft room ambience. Cinematic anime lighting."
  },


  {
    title: "Singing Her Memory",
    duration: 6,
    background: "rain-room",
    characters: "beeshal",
    camera: "Close-up",
    emotion: "Nostalgic",

    prompt:
      "Beeshal sits near the rainy window and plays his guitar while singing emotionally. Show close-ups of his fingers on the strings, his eyes and subtle facial expressions. Soft reflections of Samzana's memory begin appearing around him like cinematic flashbacks. Gentle camera movement and shallow depth of field."
  },


  {
    title: "Happy Flashback",
    duration: 8,
    background: "sunset-lake",
    characters: "both",
    camera: "Slow pull-back",
    emotion: "Warm and happy",

    prompt:
      "Transition into a warm golden memory. Beeshal and Samzana walk together, laugh and talk, then sit somewhere beautiful watching the sunset. Their interaction feels natural, peaceful and nostalgic. Warm sunlight, soft breeze, flowing hair and clothing, subtle particles. Clearly contrast this scene with the lonely present."
  },


  {
    title: "The Memory Fades",
    duration: 6,
    background: "cherry-park",
    characters: "both",
    camera: "Slow cinematic push-in",
    emotion: "Melancholic",

    prompt:
      "Return to the present. Beeshal reaches toward Samzana as if she is standing beside him, but the memory slowly disappears. His hand remains in empty air. Use slow camera movement, soft petals, emotional silence and a gradual change from warm memory colors to cooler present colors."
  },


  {
    title: "Places That Remember Her",
    duration: 8,
    background: "rain-city",
    characters: "beeshal",
    camera: "Tracking shot",
    emotion: "Nostalgic",

    prompt:
      "Show Beeshal walking alone through familiar places they once visited together. Rain falls on the streets. Briefly show Samzana appearing as a memory in the distance, then disappearing whenever Beeshal looks directly at her. Reflective pavement, city lights, quiet atmosphere and cinematic tracking."
  },


  {
    title: "Emotional Guitar Performance",
    duration: 8,
    background: "rain-room",
    characters: "beeshal",
    camera: "Slow orbit",
    emotion: "Dramatic",

    prompt:
      "Return to Beeshal playing guitar at night. The performance becomes more intense. Wind moves his hair and clothes while rain falls outside. Close-up of his eyes, vibrating guitar strings and raindrops, then a wide lonely-room shot. Slow orbit around him. Lighting subtly changes with the emotional music."
  },


  {
    title: "Running Toward the Memory",
    duration: 8,
    background: "rain-city",
    characters: "both",
    camera: "Tracking shot",
    emotion: "Dreamlike",

    prompt:
      "Beeshal suddenly sees Samzana walking away in the distance. He runs after her through a rainy street. The environment becomes increasingly dreamlike. He gets closer and reaches out his hand, but Samzana gently fades away like a memory. Emotional and symbolic, never frightening."
  },


  {
    title: "The Most Emotional Flashback",
    duration: 8,
    background: "dream-ocean",
    characters: "both",
    camera: "Slow pull-back",
    emotion: "Warm and happy",

    prompt:
      "Show their happiest memory beneath a beautiful evening sky. Beeshal and Samzana stand together, smile and look at each other. Slowly transition between their happy memory and Beeshal sitting alone in the present, showing that he is remembering a moment that cannot simply happen again."
  },


  {
    title: "Climax",
    duration: 8,
    background: "rooftop-city",
    characters: "beeshal",
    camera: "Slow orbit",
    emotion: "Dramatic",

    prompt:
      "Beeshal stands alone on a rooftop overlooking the city at night, holding his guitar. Strong wind moves his clothes. He looks toward distant city lights while memories of Samzana briefly appear around him. Dramatic wide shots, slow camera rotations, atmospheric clouds and emotional anime expressions."
  },


  {
    title: "Final Choice",
    duration: 8,
    background: "sunset-lake",
    characters: "beeshal",
    camera: "Slow pull-back",
    emotion: "Hopeful",

    prompt:
      "Instead of complete despair, Beeshal quietly accepts that the past cannot simply be recreated. He looks at the final memory of Samzana, smiles softly and closes his eyes. Then he walks forward with his guitar as morning-like sunlight begins appearing. Final shot: Beeshal walking toward the sunrise while the camera slowly moves backward."
  }

];


let backgrounds = [...DEFAULT_BACKGROUNDS];

let scenes = STORY.map((scene,index) => ({
  ...scene,
  id: `scene-${index + 1}`,
  generated: false,
  videoUrl: ""
}));


let activeIndex = 0;

let musicFile = null;


const $ = id => document.getElementById(id);


function toast(message) {

  const element = $("toast");

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(window.__toast);

  window.__toast = setTimeout(() => {

    element.classList.remove("show");

  }, 2600);

}


function init() {

  renderBackgrounds();

  renderSceneStrip();

  renderTimeline();

  populateEditor();

  bindEvents();

  updateConnectionLabel();

}


function renderBackgrounds() {

  const grid = $("backgroundGrid");

  const select = $("sceneBackground");

  grid.innerHTML = "";

  select.innerHTML = "";


  backgrounds.forEach(background => {

    const card = document.createElement("div");

    card.className = "bg-card";

    card.dataset.id = background.id;


    card.innerHTML = `
      <img
        src="${background.src}"
        alt="${escapeHtml(background.name)}"
      >

      <span>
        ${escapeHtml(background.name)}
      </span>
    `;


    card.onclick = () => {

      const scene = scenes[activeIndex];

      scene.background = background.id;

      populateEditor();

      renderBackgrounds();

    };


    if (
      background.id ===
      scenes[activeIndex].background
    ) {

      card.classList.add("active");

    }


    grid.appendChild(card);


    const option = document.createElement("option");

    option.value = background.id;

    option.textContent = background.name;

    select.appendChild(option);

  });

}


function renderSceneStrip() {

  const strip = $("sceneStrip");

  strip.innerHTML = "";


  scenes.forEach((scene,index) => {

    const button = document.createElement("button");

    button.className =
      "scene-tab" +
      (index === activeIndex ? " active" : "");


    button.innerHTML = `

      <div class="scene-number">
        SCENE ${String(index + 1).padStart(2,"0")}
      </div>

      <div class="scene-name">
        ${escapeHtml(scene.title)}
      </div>

    `;


    button.onclick = () => {

      activeIndex = index;

      renderSceneStrip();

      populateEditor();

      renderTimeline();

    };


    strip.appendChild(button);

  });

}


function renderTimeline() {

  const timeline = $("timeline");

  timeline.innerHTML = "";


  scenes.forEach((scene,index) => {

    const background = backgrounds.find(
      item => item.id === scene.background
    );


    const item = document.createElement("div");

    item.className =
      "timeline-item" +
      (index === activeIndex ? " active" : "");


    item.innerHTML = `

      <img
        src="${background?.src || ""}"
        alt=""
      >

      <div class="tinfo">

        <strong>
          ${String(index + 1).padStart(2,"0")}
          ·
          ${escapeHtml(scene.title)}
        </strong>

        <span>
          ${scene.duration}s
          ·
          ${scene.generated ? "Generated" : "Ready"}
        </span>

      </div>

    `;


    item.onclick = () => {

      activeIndex = index;

      renderSceneStrip();

      populateEditor();

      renderTimeline();

    };


    timeline.appendChild(item);

  });

}


function populateEditor() {

  const scene = scenes[activeIndex];


  $("sceneTitle").value = scene.title;

  $("sceneDuration").value =
    String(scene.duration);

  $("sceneBackground").value =
    scene.background;

  $("sceneCharacters").value =
    scene.characters;

  $("sceneCamera").value =
    scene.camera;

  $("sceneEmotion").value =
    scene.emotion;

  $("scenePrompt").value =
    scene.prompt;


  $("previewSceneTitle").textContent =
    `Scene ${String(activeIndex + 1).padStart(2,"0")} — ${scene.title}`;


  $("previewDuration").textContent =
    `${scene.duration}s`;


  $("previewCaption").textContent =
    scene.title;


  $("promptCount").textContent =
    `${scene.prompt.length} characters`;


  const background = backgrounds.find(
    item => item.id === scene.background
  );


  $("sceneBackgroundPreview").src =
    background?.src || "";


  $("previewStatus").textContent =
    scene.generated
      ? "GENERATED"
      : "STILL PREVIEW";


  updateCharacterPreview(
    scene.characters
  );

  renderBackgrounds();

}


function updateCharacterPreview(characters) {

  $("previewBeeshal").style.display =
    (
      characters === "beeshal" ||
      characters === "both"
    )
      ? "block"
      : "none";


  $("previewSamzana").style.display =
    (
      characters === "samzana" ||
      characters === "both"
    )
      ? "block"
      : "none";

}


function bindEvents() {

  [
    "sceneTitle",
    "sceneDuration",
    "sceneBackground",
    "sceneCharacters",
    "sceneCamera",
    "sceneEmotion",
    "scenePrompt"
  ].forEach(id => {

    $(id).addEventListener(
      "input",
      syncEditor
    );

    $(id).addEventListener(
      "change",
      syncEditor
    );

  });


  $("scenePrompt").addEventListener(
    "input",
    () => {

      $("promptCount").textContent =
        `${$("scenePrompt").value.length} characters`;

    }
  );


  $("enhancePromptBtn").onclick =
    enhancePrompt;


  $("generateBtn").onclick =
    generateScene;


  $("duplicateSceneBtn").onclick =
    duplicateScene;


  $("deleteSceneBtn").onclick =
    deleteScene;


  $("resetAssetsBtn").onclick =
    resetAssets;


  $("saveProjectBtn").onclick =
    saveProject;


  $("loadProjectInput").onchange =
    loadProject;


  $("exportPlanBtn").onclick =
    exportPlan;


  $("previewVideoBtn").onclick =
    openStoryPreview;


  $("closeModalBtn").onclick =
    closeStoryPreview;


  $("closeStoryBtn").onclick =
    closeStoryPreview;


  $("musicUpload").onchange =
    handleMusic;


  $("apiEndpoint").oninput =
    updateConnectionLabel;


  $("samzanaUpload").onchange =
    event =>
      handleImageUpload(
        event,
        "samzanaPreview"
      );


  $("beeshalUpload").onchange =
    event =>
      handleImageUpload(
        event,
        "beeshalPreview"
      );


  $("guitarUpload").onchange =
    event =>
      handleImageUpload(
        event,
        "guitarPreview"
      );


  $("backgroundUpload").onchange =
    handleBackgroundUploads;

}


function syncEditor() {

  const scene = scenes[activeIndex];


  scene.title =
    $("sceneTitle").value.trim() ||
    `Scene ${activeIndex + 1}`;


  scene.duration =
    Number($("sceneDuration").value);


  scene.background =
    $("sceneBackground").value;


  scene.characters =
    $("sceneCharacters").value;


  scene.camera =
    $("sceneCamera").value;


  scene.emotion =
    $("sceneEmotion").value;


  scene.prompt =
    $("scenePrompt").value;


  scene.generated = false;

  scene.videoUrl = "";


  $("previewSceneTitle").textContent =
    `Scene ${String(activeIndex + 1).padStart(2,"0")} — ${scene.title}`;


  $("previewDuration").textContent =
    `${scene.duration}s`;


  $("previewCaption").textContent =
    scene.title;


  $("sceneBackgroundPreview").src =
    backgrounds.find(
      item => item.id === scene.background
    )?.src || "";


  updateCharacterPreview(
    scene.characters
  );


  renderSceneStrip();

  renderTimeline();

}


function enhancePrompt() {

  const scene = scenes[activeIndex];


  const additions = `

Cinematic anime music-video direction:
preserve exact character identity and clothing;
natural facial expressions; smooth believable body movement;
consistent proportions; subtle wind and environmental motion;
layered foreground and background depth;
soft volumetric lighting;
shallow depth of field;
controlled camera movement;
emotional pacing;
no character redesign;
no extra fingers or distorted anatomy;
maintain continuity with previous and next scenes.
`;


  if (
    !scene.prompt.includes(
      "Cinematic anime music-video direction"
    )
  ) {

    scene.prompt += additions;

  }


  populateEditor();

  toast(
    "Prompt enhanced for cinematic generation."
  );

}


async function generateScene() {

  syncEditor();


  const endpoint =
    $("apiEndpoint").value.trim();


  const model =
    $("modelName").value.trim();


  const scene =
    scenes[activeIndex];


  $("generationTitle").textContent =
    "Preparing scene…";


  $("generationSubtitle").textContent =
    "Building references and generation payload.";


  $("generateBtn").disabled = true;


  const payload = {

    project: "Memory Frame",

    model,

    aspectRatio:
      $("aspectRatio").value,

    style:
      $("stylePreset").value,


    scene: {

      ...scene,

      sceneNumber:
        activeIndex + 1,

      background:
        backgrounds.find(
          item => item.id === scene.background
        ) || null

    },


    characterReferences: {

      samzana:
        $("samzanaPreview").src,

      beeshal:
        $("beeshalPreview").src

    },


    propReferences: {

      guitar:
        $("guitarPreview").src

    }

  };


  /*
    DEMO MODE

    If no backend endpoint is entered,
    the site simulates generation.
  */

  if (!endpoint) {

    await fakeDemoGeneration();

    $("generateBtn").disabled = false;

    return;

  }


  try {

    $("generationTitle").textContent =
      "Generating…";


    const response =
      await fetch(
        endpoint,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(payload)

        }
      );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    const data =
      await response.json();


    const videoUrl =
      data.videoUrl ||
      data.url ||
      data.output?.videoUrl;


    if (!videoUrl) {

      throw new Error(
        "Backend returned no video URL."
      );

    }


    scene.generated = true;

    scene.videoUrl = videoUrl;


    $("generationTitle").textContent =
      "Scene generated";


    $("generationSubtitle").textContent =
      "Video URL received from your backend.";


    $("previewStatus").textContent =
      "GENERATED VIDEO";


    renderTimeline();


    toast(
      "Scene generated successfully."
    );

  }

  catch(error) {

    $("generationTitle").textContent =
      "Generation failed";


    $("generationSubtitle").textContent =
      error.message;


    toast(
      "API error: check your endpoint and CORS settings."
    );

  }

  finally {

    $("generateBtn").disabled = false;

  }

}


function fakeDemoGeneration() {

  return new Promise(resolve => {

    let progress = 0;


    const timer =
      setInterval(() => {

        progress += 20;


        $("generationTitle").textContent =
          `Demo generation ${progress}%`;


        if (progress >= 100) {

          clearInterval(timer);


          scenes[activeIndex].generated =
            true;


          $("generationTitle").textContent =
            "Demo scene ready";


          $("generationSubtitle").textContent =
            "Connect a real backend endpoint to generate an MP4.";


          $("previewStatus").textContent =
            "DEMO READY";


          renderTimeline();


          toast(
            "Demo complete — connect your API for real video generation."
          );


          resolve();

        }

      },180);

  });

}


function duplicateScene() {

  syncEditor();


  const copy =
    JSON.parse(
      JSON.stringify(
        scenes[activeIndex]
      )
    );


  copy.id =
    `scene-${Date.now()}`;


  copy.title =
    `${copy.title} Copy`;


  copy.generated = false;

  copy.videoUrl = "";


  scenes.splice(
    activeIndex + 1,
    0,
    copy
  );


  activeIndex++;


  renderSceneStrip();

  populateEditor();

  renderTimeline();


  toast(
    "Scene duplicated."
  );

}


function deleteScene() {

  if (scenes.length <= 1) {

    toast(
      "At least one scene is required."
    );

    return;

  }


  scenes.splice(
    activeIndex,
    1
  );


  activeIndex =
    Math.max(
      0,
      Math.min(
        activeIndex,
        scenes.length - 1
      )
    );


  renderSceneStrip();

  populateEditor();

  renderTimeline();


  toast(
    "Scene deleted."
  );

}


function handleImageUpload(
  event,
  targetId
) {

  const file =
    event.target.files[0];


  if (!file) return;


  const url =
    URL.createObjectURL(file);


  $(targetId).src = url;


  toast(
    "Reference image loaded for this session."
  );

}


function handleBackgroundUploads(
  event
) {

  [
    ...event.target.files
  ].forEach(
    (file,index) => {

      const url =
        URL.createObjectURL(file);


      backgrounds.push({

        id:
          `custom-${Date.now()}-${index}`,

        name:
          file.name.replace(
            /\.[^/.]+$/,
            ""
          ),

        src: url,

        custom: true

      });

    }
  );


  renderBackgrounds();

  populateEditor();


  toast(
    "Backgrounds added."
  );

}


function handleMusic(event) {

  musicFile =
    event.target.files[0] ||
    null;


  if (!musicFile) return;


  $("musicName").textContent =
    musicFile.name;


  $("musicMeta").textContent =
    `${(
      musicFile.size / 1024 / 1024
    ).toFixed(2)} MB`;


  $("audioPlayer").src =
    URL.createObjectURL(
      musicFile
    );

}


function saveProject() {

  syncEditor();


  const project = {

    version: 1,

    name:
      "Memory Frame Project",

    savedAt:
      new Date().toISOString(),


    settings: {

      apiEndpoint:
        $("apiEndpoint").value,

      modelName:
        $("modelName").value,

      aspectRatio:
        $("aspectRatio").value,

      stylePreset:
        $("stylePreset").value

    },


    scenes,


    backgrounds:
      backgrounds.filter(
        background =>
          !background.custom
      )

  };


  downloadBlob(

    JSON.stringify(
      project,
      null,
      2
    ),

    "memory-frame-project.json",

    "application/json"

  );


  toast(
    "Project JSON saved."
  );

}


function loadProject(event) {

  const file =
    event.target.files[0];


  if (!file) return;


  const reader =
    new FileReader();


  reader.onload = () => {

    try {

      const project =
        JSON.parse(
          reader.result
        );


      if (
        Array.isArray(
          project.scenes
        )
      ) {

        scenes =
          project.scenes;

      }


      if (
        Array.isArray(
          project.backgrounds
        )
      ) {

        backgrounds =
          project.backgrounds;

      }


      activeIndex = 0;


      if (project.settings) {

        $("apiEndpoint").value =
          project.settings.apiEndpoint ||
          "";


        $("modelName").value =
          project.settings.modelName ||
          "anime-video-model";


        $("aspectRatio").value =
          project.settings.aspectRatio ||
          "16:9";


        $("stylePreset").value =
          project.settings.stylePreset ||
          "cinematic-anime";

      }


      renderBackgrounds();

      renderSceneStrip();

      populateEditor();

      renderTimeline();

      updateConnectionLabel();


      toast(
        "Project loaded."
      );

    }

    catch(error) {

      toast(
        "Invalid project JSON."
      );

    }

  };


  reader.readAsText(file);

}


function exportPlan() {

  syncEditor();


  const plan = {

    project:
      "Memory Frame",

    style:
      $("stylePreset").value,

    aspectRatio:
      $("aspectRatio").value,

    model:
      $("modelName").value,


    scenes:
      scenes.map(
        (scene,index) => ({

          sceneNumber:
            index + 1,

          title:
            scene.title,

          duration:
            scene.duration,

          background:
            scene.background,

          characters:
            scene.characters,

          camera:
            scene.camera,

          emotion:
            scene.emotion,

          prompt:
            scene.prompt,

          generated:
            scene.generated,

          videoUrl:
            scene.videoUrl ||
            null

        })
      )

  };


  downloadBlob(

    JSON.stringify(
      plan,
      null,
      2
    ),

    "memory-frame-generation-plan.json",

    "application/json"

  );


  toast(
    "Generation plan exported."
  );

}


function openStoryPreview() {

  syncEditor();


  $("storyPreviewList").innerHTML =

    scenes.map(
      (scene,index) => `

        <div class="story-row">

          <strong>
            Scene
            ${String(index + 1).padStart(2,"0")}
            —
            ${escapeHtml(scene.title)}
            ·
            ${scene.duration}s
          </strong>

          <p>
            ${escapeHtml(scene.prompt)}
          </p>

        </div>

      `
    ).join("");


  $("storyModal")
    .classList
    .remove("hidden");

}


function closeStoryPreview() {

  $("storyModal")
    .classList
    .add("hidden");

}


function resetAssets() {

  $("samzanaPreview").src =
    "assets/samzana.png";


  $("beeshalPreview").src =
    "assets/beeshal.png";


  $("guitarPreview").src =
    "assets/guitar.png";


  toast(
    "Asset previews reset."
  );

}


function updateConnectionLabel() {

  const endpoint =
    $("apiEndpoint")
      .value
      .trim();


  $("connectionLabel").textContent =
    endpoint
      ? "API configured"
      : "Demo mode";

}


function downloadBlob(
  content,
  filename,
  type
) {

  const blob =
    new Blob(
      [content],
      { type }
    );


  const link =
    document.createElement("a");


  link.href =
    URL.createObjectURL(
      blob
    );


  link.download =
    filename;


  link.click();


  setTimeout(
    () =>
      URL.revokeObjectURL(
        link.href
      ),
    1000
  );

}


function escapeHtml(value) {

  return String(value).replace(
    /[&<>"']/g,

    character => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[character])

  );

}


init();
