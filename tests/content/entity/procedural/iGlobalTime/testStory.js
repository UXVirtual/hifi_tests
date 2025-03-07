if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Procedural iGlobalTime", Script.resolvePath("."), "secondary", undefined, function(testType) {
    var entityIds = [];

    var LIFETIME = 60; // 1 min

    MyAvatar.orientation = { x: 0, y: 1, z: 0, w: 0 };

    var assetsRootPath = nitpick.getAssetsRootPath();

    entityIds.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Procedural Cube TexCoords",
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(4, Quat.getFront(MyAvatar.orientation))),
        dimensions: { x: 0.5, y: 0.5, z: 0.5 },
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRootPath + "shaders/proceduralShapeTestiGlobalTime.fs",
                "version": 2
            }
        })
    }));

    entityIds.push(Entities.addEntity({
        type: "Zone",
        name: "Procedural Zone",
        position: MyAvatar.position,
        dimensions: { x: 5, y: 5, z: 5},
        keyLightMode: "enabled",
        keyLight:{
            "color": {"red":255,"green":255,"blue":255},
            "direction": {
                "x": 1.0,
                "y": -1.0,
                "z": 1.0
            },
            "intensity": 1.0
        },
        skyboxMode: "enabled",
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRootPath + "shaders/proceduralZoneTestiGlobalTime.fs",
                "version": 2
            }
        })
    }));

    nitpick.addStep("Rotate secondary camera", function () {
        validationCamera_setRotation({ x: 0.0, y: 180.0, z: 0.0 });
    });

    nitpick.addStepSnapshot("Take snapshot of the procedural shape and zone entities");

    nitpick.addStep("Clean up after test", function () {
        for (var i in entityIds) {
            Entities.deleteEntity(entityIds[i]);
        }
    });

    var result = nitpick.runTest(testType);
});