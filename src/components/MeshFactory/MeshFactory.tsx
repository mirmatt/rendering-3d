import { Html, PivotControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import geometriesMapping from "../../types/geometryMapping";
import styles from "./MeshFactory.module.css";

interface MeshFactoryProps {
    color: string;
    position?: [number, number, number];
    type: string;
    content?: ReactNode;
}

const MeshFactory: React.FC<MeshFactoryProps> = (props) => {
    const [isSelected, setSelected] = useState<boolean>(false);
    const cubeRef = useRef<Mesh>(null!);

    const startPosition: [number, number, number] = props.position ? props.position : [0, 0, 0];
    const controlOffset: [number, number, number] = [
        startPosition[0] - 1,
        startPosition[1] - 1,
        startPosition[2] - 1,
    ];

    useFrame(({ clock }) => {
        // cubeRef.current.rotation.y = clock.getElapsedTime();
    });

    return (
        <>
            <PivotControls
                offset={controlOffset}
                visible={isSelected ? true : false}
                disableAxes={!isSelected ? true : false}
                disableSliders={!isSelected ? true : false}
                disableRotations={!isSelected ? true : false}
            >
                <mesh
                    ref={cubeRef}
                    onClick={(event) => {
                        if (event.detail === 2) {
                            setSelected(!isSelected);
                        }
                    }}
                    position={startPosition}
                    castShadow
                >
                    <meshStandardMaterial color={props.color} />
                    {geometriesMapping[props.type]}
                    {props.content && isSelected ? (
                        <Html distanceFactor={10}>
                            <div className={styles.meshLabel}>{props.content}</div>
                        </Html>
                    ) : (
                        ""
                    )}
                </mesh>
            </PivotControls>
        </>
    );
};

export default MeshFactory;
