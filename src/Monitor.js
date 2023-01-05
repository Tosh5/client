import React, { FC, useCallback, useEffect, useRef, useState, VFC } from 'react';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { drawCanvas } from './drawCanvas';


const frames = 20; // 直近何フレームの動きの激しさを取得するか？
const scale = 30; // 取得した手の座標を何倍に拡大して激しさを取得するか？

let gap_record = [...Array(frames)].map((_, i) => i);
for (var i = 0; i < frames; i++){
	gap_record[i] = 0;  // 0 で初期化
}

export const additionalIndex = (additional_score) =>{
	gap_record.splice(0,1);
	gap_record.push(additional_score);
}

const Monitor = (props) => {
	const [index2, useIndex2] = useState(0)
	props.useIndex(index2);

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const resultsRef = useRef()

	let prev_x = 0;
	let prev_y = 0;
	let pos_x = 0;
	let pos_y = 0;
	let dif_x = 0;
	let dif_y = 0;
	let distance = 0;

	useEffect(()=>{
		gap_record.splice(0,1);
		gap_record.push(100);
	},[])
	
	/**
	 * 検出結果（フレーム毎に呼び出される）
	 * @param results
	 */
	const onResults = useCallback((results) => {
		resultsRef.current = results
		const canvasCtx = canvasRef.current.getContext('2d')
		drawCanvas(canvasCtx, results)
		// OutputData();
		Location();
	}, [])

	// 初期設定
	useEffect(() => {
		const hands = new Hands({
			locateFile: file => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
			}
		})

		hands.setOptions({
			maxNumHands: 2,
			modelComplexity: 1,
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5
		})

		hands.onResults(onResults)

		if (typeof webcamRef.current !== 'undefined' && webcamRef.current!== null) {
			const camera = new Camera(webcamRef.current.video, {
				onFrame: async () => {
					await hands.send({ image: webcamRef.current.video })
				},
				width: 1280,
				height: 720
			})
			camera.start()
		}
	}, [onResults])

	const sumArray = array => {
		let sum = 0;
		for (let i = 0, len = array.length; i < len; i++) {
		  sum += array[i];
		}
		return sum;
	};


	const Location = () =>{
		const results = resultsRef.current  
		

		try{
			pos_x = results.multiHandLandmarks[0][20].x * scale
			pos_y = results.multiHandLandmarks[0][20].y * scale
			dif_x = pos_x - prev_x
			dif_y = pos_y - prev_y
			distance = Math.round(Math.sqrt(dif_x*dif_x + dif_y*dif_y))
			// distance = Math.sqrt(dif_x**2 + dif_y**2)
			gap_record.splice(0,1);
			gap_record.push(distance)
			
			prev_x = pos_x
			prev_y = pos_y
			// dif_x = 0
			// dif_y = 0
		}catch(error){
			gap_record.splice(0,1);
			gap_record.push(0);
		}
		// try{
		// 	gap_record.splice(0,1);
		// 	gap_record.push(props.voiceAdd)
		// 	console.log(`voiceAdd id: ${props.voiceAdd}`)
		// }catch(error){
		// 	gap_record.splice(0,1);
		// 	gap_record.push(0);
		// }


		useIndex2(sumArray(gap_record))
		// console.log(sumArray(gap_record))
		
	}

	return (
		<div className={styles.container}>
			{/* capture */}
			<Webcam
				audio={false}
				style={{ visibility: 'hidden' }}
				width={1280}
				height={720}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
			/>
			{/* draw */}
			<canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
			{/* output */}
            {/* <h1>aa</h1> */}

			<div className={styles.buttonContainer}>
				{/* <button className={styles.button} onClick={OutputData}>
					Output Data
				</button> */}
                {/* <h1>画像解析中</h1> */}
				{/* <h3>{String(handC)}</h3>
				<h3 className='index2'>{String(index2)}</h3> */}
			</div>
		</div>
	)
}
export default Monitor;

// ==============================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 50vw;
		height: 50vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
        // margin-left: auto;
        // margin-right: 1vw;
        // margin-top: auto;
        // margin-bottom: 0%;
		border-radius:20px;
	`,
	canvas: css`
		position: absolute;
		width: 1280px;
		height: 720px;
		background-color: #fff;
	`,
	buttonContainer: css`
		position: absolute;
		top: 0vh;
		left: 1vw;
		font-size: 20px;
	`,
	button: css`
		color: #fff;
		background-color: #0082cf;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		padding: 10px 10px;
		cursor: pointer;
	`
}
