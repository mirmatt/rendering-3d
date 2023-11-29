import { Ref, useState } from "react";
import BaseScene from "../../components/BaseScene/BaseScene";
import React from "react";
import Actions from "../../components/Actions/Actions";
import baseMeshes from "../../data/baseMeshes";
import MeshList from "../../components/MeshList/MeshList";
import { meshContainerInterface } from "../../types/MeshContainer";
import { Mesh } from "three";


/**
 * 
 * @returns JSX.Element
 * @description Main page of the application. Contains mainly the various Refs and Actions that are needed around the application
 */
const Homepage = () => {
	/** @description All the meshes are kept inside an array, mapped by a unique ID, so they can be retrieved in a later moment. The initial variable are the meshes that are loaded at the start. */
    const [meshContainer, setLiveMesh] = useState<meshContainerInterface[]>(baseMeshes);
	/** @description The camera ref is used to reset the camera at the starting position. Is set inside the CameraControl component */
    const [cameraRef, setCameraRef] = useState<Ref<THREE.PerspectiveCamera>>();
	/** @description Used to focus the canvas after the camera has been reset (clicking the button remove the focus on it). Set inside the BaseScene component */
    const [sceneRef, setSceneRef] = useState<Ref<HTMLDivElement>>();

	/** @description we remove the unwanted mesh by filtering in all the meshes that have a different ID from our target */
    const removeFromScene = (targetMeshId: string): void => {
        setLiveMesh(
            meshContainer.filter((mesh) => {
                return mesh.id !== targetMeshId;
            })
        );
    };

	/** @description Here we join the newly created Mesh component by using the spread syntax, and joining the current container with the new object */
    const addToScene = (newMesh: React.ReactElement<Mesh>): void => {
        setLiveMesh([
            ...meshContainer,
            ...[
                {
                    id: crypto.randomUUID().slice(0, 4),
                    mesh: newMesh,
                },
            ],
        ]);
    };

    return (
        <>
            <Actions createMesh={addToScene} cameraRef={cameraRef} sceneRef={sceneRef}></Actions>

            <MeshList
                deleteMesh={removeFromScene}
                meshesList={meshContainer.map((singleMesh) => singleMesh.id)}
            />
            <BaseScene updateCameraRef={setCameraRef} setSceneRef={setSceneRef}>
                {meshContainer.map((singleMesh) => {
                    return singleMesh.mesh;
                })}
            </BaseScene>
        </>
    );
};

export default Homepage;
