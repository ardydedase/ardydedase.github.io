# Software security concepts

Below are some notes about software security. This will cover the fundamentals and most common use cases.

## Typical security objectives

### Confidentiality
Ensures that the information is accessible only to the authorised users or group of users.

### Integrity
Ensures correctness and completeness of the information and processing methods.

### Availability
Ensures that authorised users have access to information when there is a need.

## Access control

- Identification (assert your identity)
- Authentication (prove your identity) 
- Authorisation (prove that you have sufficient access)
- Audit trail (keep track of who did what, when, where and how.)

## Methods of authentication

### Knowledge-based
The most common and basic method of authentication. This relies on what you know. For example, logging in with your username and password. 

### Token-based
This method relies on what you have. Mostly used as an extra security layer together with knowlege-based method of authentication. For example: DBS's iBanking token, Google authenticator app for 2FA.

### Biometrics
This method relies on what you are. Examples are: Facial recognition and fingerprint authentication.

#### Biometric authentication

Biometrics is often used for securing physical and logical controls.
Verification is based on physiological or behavioral characteristics.

- Physiological e.g. Fingerprint, retina scan, iris scan
- Behavioral e.g. Signature dynamics

There are two core processes involved:

- Enrolment
- Verification

#### Enrolment stages
- Capture
- Extraction
 - Extract features of biometric characteristics and convert these features to its digital representation known as biometric template.
- Package creation and assurance
 - Bind the biometric template to an identity e.g. subject's name and passport number.
 - Digitally sign and encrypt that package.
- Package storage
 - Signed and encrypted package is written to a non-volatile storage e.g. Smart card

#### Enrolment threats
- Start with false identity e.g. An imposter can use false identity during enrolment and is able to authenticate the impersonated identity. Possible control to use: Photo ID. 
- Identity is associated with a poor biometric template. e.g. Poor lighting in facial recognition system, speaking softly in voice recognition system.

#### Verification stages

- Identification
 - Subject presents authentication parameters.
- Capture
- Extraction
 - Similar to Extraction process in Enrolment but using the extracted data as a live authentication data instead of keeping it for storage.
- Comparison 
 - Comparison of biometric data collected during authentication with data collected during enrolment.

#### Verification threats
- Accepting false samples as matches.
- Presenting fake artifacts e.g. fake hands and photo.
- Using residual data from device's memory to gain access using identity of a user that was recently authenticated. This can be prevented by clearing all biometric data from memory before accepting a new transaction and by rejecting consecutive identical live samples.


## Risk management

TODO: add a diagram. Figure 1.

### Risk
Potential harm that a threat can cause to your asset.

### Asset
Anything that is valuable to the organisation.

### Threat
Anything that has potential to harm the assets.

### Vulnerability
Weakness in the control that can be exploited by a threat.

### Control
Proactive activities that help prevent the impact of threats to assets.



 
