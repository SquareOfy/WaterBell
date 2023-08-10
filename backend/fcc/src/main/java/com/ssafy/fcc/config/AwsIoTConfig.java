package com.ssafy.fcc.config;

import com.amazonaws.services.iot.client.AWSIotException;
import com.amazonaws.services.iot.client.AWSIotMessage;
import com.amazonaws.services.iot.client.AWSIotMqttClient;
import com.amazonaws.services.iot.client.AWSIotQos;
import com.ssafy.fcc.dto.MqttMessage;
import com.ssafy.fcc.dto.MqttTopic;
import com.ssafy.fcc.dto.raspPayload;
import com.ssafy.fcc.service.SystemService;
import org.springframework.context.annotation.Configuration;


@Configuration
public class AwsIoTConfig {

    String clientEndpoint = "a221zxhtj4qlos-ats.iot.us-east-2.amazonaws.com";
    String clientId = "IoTCore";
    String awsAccessKeyId = "AKIASBP5HSYQ5IDP7QNO";
    String awsSecretAccessKey = "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";

    AWSIotMqttClient client = null;


    private final SystemService systemService;

    public AwsIoTConfig(SystemService systemService) throws AWSIotException {
        this.systemService = systemService;
        this.client = new AWSIotMqttClient(clientEndpoint, clientId, awsAccessKeyId, awsSecretAccessKey, null);
        client.connect();
        System.out.println("Connected to IoT");

        subscribeToTopics();
    }

    private void subscribeToTopics() throws AWSIotException {

        String[] topics = {"Arduino/SENSOR", "Arduino/CAM"};

        for (String topicName : topics) {
            subscribeToTopic(topicName);
        }
    }

    private void subscribeToTopic(String topicName) throws AWSIotException {

        if(topicName.equals("Arduino/SENSOR")) {
            client.subscribe(new MqttTopic(topicName) {
                @Override
                public void onMessage(AWSIotMessage message) {
                    try {
                        handleReceivedMessage(message.getStringPayload());
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            });
        } else if(topicName.equals("Arduino/CAM")) {

        }
    }

    private void handleReceivedMessage(String message) throws Exception {
        systemService.fromSensor(message);
    }


    public void publish(String topic, String message) throws AWSIotException {
        AWSIotQos qos = AWSIotQos.QOS0;
        long timeout = 3000;

        MqttMessage mqttMessage = new MqttMessage(topic, message, qos);
        client.publish(mqttMessage, timeout);
    }

}