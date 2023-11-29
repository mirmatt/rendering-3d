import { Html, PivotControls } from "@react-three/drei";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { EdgesGeometry, LineBasicMaterial, LineSegments, Mesh } from "three";
import geometriesMapping from "../../types/geometryMapping";
import styles from "./MeshFactory.module.css";

interface MeshFactoryProps {
    color: string;
    position?: [number, number, number];
    type: string;
    content?: ReactNode;
}

/**
 * 
 * @description Component that handles the creation of meshes. It contains some basic properties shared by all of them (controls, wireframe, material, label).
 * @description To know which geometry to use, the component uses an object that contains a mapping between keys and geometries. This mapping acts as a de-facto template for the meshes.
 */
const MeshFactory: React.FC<MeshFactoryProps> = (props) => {
    const [isSelected, setSelected] = useState<boolean>(false);
    const cubeRef = useRef<Mesh>(null!);

	/** @description We use those two to both let the factory create the mesh at the desired position and create the controls anchored to the mesh itself */
    const startPosition: [number, number, number] = props.position ? props.position : [0, 0, 0];
    const controlOffset: [number, number, number] = [
        startPosition[0] - 1,
        startPosition[1] - 1,
        startPosition[2] - 1,
    ];

	/** @description After the compone thas been created, we append a wireframe of the geometry to it, to help with visibility */
	useEffect(() => {
		const geo = new EdgesGeometry(cubeRef.current.geometry)
		const mat = new LineBasicMaterial({color: "black"})
		const wireframe = new LineSegments(geo, mat)
		cubeRef.current.add(wireframe)
	}, [])

    return (
        <>
			{/** the controls are dinamically activated or disabled based on the double click on the element.
			 * Rather than creating or removing it using the isSelected as a boolean, we hide it and disable all it's axis.
			*/}
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
					{/** The meshes can contain any type of HTML. They are optimized for text and/or links. */}
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
