import {
    FirstPersonControls
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

interface CameraMovement {
    goLeft: boolean;
    goRight: boolean;
    goUp: boolean;
    goDown: boolean;
    goForward: boolean;
    goBack: boolean;
    rotateLeft: boolean;
    rotateRight: boolean;
    rotateUp: boolean;
    rotateDown: boolean;
}

interface CameraControlsProps {
    direction: CameraMovement;
    isActive: boolean;
    setCameraRef: Function;
}

/**
 * @description Component that actually move the camera. Also sets the ref for it.
 */
const CameraControl: React.FC<CameraControlsProps> = (props) => {
    const getCamera = useThree((state) => state.get);

    const camera = getCamera().camera;
    const controlRef = useRef(null!);
    const cameraSpeed = 2;
    useFrame(({ camera }, delta) => {
        if (props.direction.goLeft) {
            camera.translateX(-cameraSpeed * 4 * delta);
        }
        if (props.direction.goRight) {
            camera.translateX(cameraSpeed * 4 * delta);
        }
        if (props.direction.goUp) {
            camera.translateY(cameraSpeed * 4 * delta);
        }
        if (props.direction.goDown) {
            camera.translateY(-cameraSpeed * 4 * delta);
        }
        if (props.direction.goForward) {
            camera.translateZ(-cameraSpeed * 4 * delta);
            props.direction.goForward = false;
        }
        if (props.direction.goBack) {
            camera.translateZ(cameraSpeed * 4 * delta);
            props.direction.goBack = false;
        }

        if (props.direction.rotateLeft) {
            camera.rotateY((cameraSpeed / 2) * delta);
        }
        if (props.direction.rotateRight) {
            camera.rotateY((-cameraSpeed / 2) * delta);
        }
        if (props.direction.rotateUp) {
            camera.rotateX((cameraSpeed / 2) * delta);
        }
        if (props.direction.rotateDown) {
            camera.rotateX((-cameraSpeed / 2) * delta);
        }
    });

    useEffect(() => {
        props.setCameraRef(getCamera().camera);
    }, []);

    return (
        <>
            <FirstPersonControls ref={controlRef} lookSpeed={0.5} enabled={props.isActive}/>
        </>
    );
};

export default CameraControl;
