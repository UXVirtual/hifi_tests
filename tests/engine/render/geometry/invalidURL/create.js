if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
var initData = { originFrame: nitpick.getOriginFrame() };
var createdEntities = setupStage(initData);

var properties = {
    lifetime: 120,  
    type: "Model",  
    name: "invalid url model",
    position: getStagePosOriAt(0, -1, 0).pos,
    modelURL: "asdf"
};

// invalid url model
createdEntities.push(Entities.addEntity(properties));

var assetsRootPath = nitpick.getAssetsRootPath();
properties.modelURL = assetsRootPath + "models/geometry/avatars/art3mis/art3mis.fst";
properties.position = getStagePosOriAt(0, 1, 0).pos;
properties.name = "valid url model";

// valid url model
createdEntities.push(Entities.addEntity(properties));

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
