import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import CameraControl from "../CameraControl/CameraControl";
import { Euler, PlaneGeometry } from "three";

interface BaseSceneProps {
    children?: React.ReactNode;
    updateCameraRef: Function;
	setSceneRef: Function
}

/**
 * 
 * @description Holder of the canvas and most of the components used to render it, meshes excluded.
 * @description Contains all the functions and events used for the camera movement, becouse they are caught at the top level container. BaseScene then passes them at the dedicated component.
 * @description The Mesh instantiation is deferred to a dedicated component, so to leave the canvas free to accept any kind and quantity of objects.
 */
const BaseScene: React.FC<BaseSceneProps> = (props) => {
	/** @description Boolean used to activate or deactivate the mouse control for the rotation of the camera. */
    const [cameraControl, setCameraControl] = useState<boolean>(false);
	/** @description This is the movement mapper used to move the camera. It uses this structure to let the camera moves in multiple directions at once. */
    let cameraMovement = {
        goLeft: false,
        goRight: false,
        goUp: false,
        goDown: false,
        goForward: false,
        goBack: false,
        rotateLeft: false,
        rotateRight: false,
        rotateUp: false,
        rotateDown: false,
    };

	/** @description small fix to let the user control the canvas as soon as the page is loaded*/
    const containerRef = useRef<HTMLDivElement>(null!);
    const focusScene = (): void => {
        containerRef.current.focus();
    };
    useEffect(() => {
        focusScene();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (event?.key) {
            case "a":
                cameraMovement.goLeft = true;
                break;
            case "d":
                cameraMovement.goRight = true;
                break;
            case "w":
                cameraMovement.goUp = true;
                break;
            case "s":
                cameraMovement.goDown = true;
                break;
            case "ArrowUp":
                cameraMovement.rotateUp = true;
                break;
            case "ArrowLeft":
                cameraMovement.rotateLeft = true;
                break;
            case "ArrowDown":
                cameraMovement.rotateDown = true;
                break;
            case "ArrowRight":
                cameraMovement.rotateRight = true;
                break;
            default:
                console.log(event?.key);
        }
    };
    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (event?.key) {
            case "a":
                cameraMovement.goLeft = false;
                break;
            case "d":
                cameraMovement.goRight = false;
                break;
            case "w":
                cameraMovement.goUp = false;
                break;
            case "s":
                cameraMovement.goDown = false;
                break;
            case "ArrowUp":
                cameraMovement.rotateUp = false;
                break;
            case "ArrowLeft":
                cameraMovement.rotateLeft = false;
                break;
            case "ArrowDown":
                cameraMovement.rotateDown = false;
                break;
            case "ArrowRight":
                cameraMovement.rotateRight = false;
                break;
            default:
                console.log(event?.key);
        }
    };

    return (
        <div
            onKeyDown={(ev) => {
                handleKeyDown(ev);
            }}
            onKeyUp={(ev) => {
                handleKeyUp(ev);
            }}
            onMouseDown={(ev) => {
                if (ev.button === 1) {
                    setCameraControl(true);
                }
            }}
            onMouseUp={(ev) => {
                if (ev.button === 1) {
                    setCameraControl(false);
                }
            }}
            onWheel={(ev) => {
                if (ev.deltaY > 0) {
                    cameraMovement.goBack = true;
                    cameraMovement.goForward = false;
                } else if (ev.deltaY < 0) {
                    cameraMovement.goBack = false;
                    cameraMovement.goForward = true;
                }
            }}
            ref={containerRef}
            tabIndex={0}
            style={{
                height: "100%",
            }}
        >
            <Canvas shadows camera={{ position: [0, 5, 10] }} onCreated={() => {
				props.setSceneRef(containerRef)
			}}>
                <ambientLight />
                <spotLight position={[10, 10, 5]} angle={0.25} penumbra={0.5} castShadow />
                <pointLight position={[0, 5, 15]} decay={0} intensity={Math.PI / 2} />
                <CameraControl
                    direction={cameraMovement}
                    isActive={cameraControl}
                    setCameraRef={props.updateCameraRef}
                />
				{/** @description base plane of the canvas */}
                <mesh receiveShadow rotation={new Euler(-Math.PI / 2, 0, 0)} position={[0, -10, 0]}>
                    <planeGeometry args={[1000, 1000]} />
                    <meshStandardMaterial color="#f0f0f0" />
                </mesh>
                {props.children}
            </Canvas>
        </div>
    );
};

export default BaseScene;
