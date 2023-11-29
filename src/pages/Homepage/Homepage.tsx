import { ReactNode, Ref, useEffect, useState } from "react";
import BaseScene from "../../components/BaseScene/BaseScene";
import React from "react";
import Actions from "../../components/Actions/Actions";
import baseMeshes from "../../data/baseMeshes";
import MeshList from "../../components/MeshList/MeshList";

interface meshContainerInterface {
    id: string;
    mesh: React.ReactElement<allowedMeshes>;
}

const Homepage = () => {
    const [meshContainer, setLiveMesh] = useState<meshContainerInterface[]>(baseMeshes);
    const [cameraRef, setCameraRef] = useState<Ref<THREE.PerspectiveCamera>>();
	const [sceneRef, setSceneRef] = useState<Ref<HTMLDivElement>>()

    const removeFromScene = (targetMeshId: string): void => {
        const stateCopy = meshContainer;
		const cleanContainer = stateCopy.filter((mesh) => {
			return mesh.id !== targetMeshId;
		})
        setLiveMesh(
            stateCopy.filter((mesh) => {
                return mesh.id !== targetMeshId;
            })
        );
    };

    const addToScene = (newMesh: React.ReactElement<allowedMeshes>): void => {
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
            <Actions
                createMesh={addToScene}
                cameraRef={cameraRef}
				sceneRef={sceneRef}
            ></Actions>

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
