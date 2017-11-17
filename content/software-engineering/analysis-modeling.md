# Analysis Modeling

Analysis modeling has three dimensions:

- Information
- Behaviour
- Presentation

## Analysis Objects

### Boundary Objects (Presentation)

Objects that interact directly with Actors e.g. input data from a form.


![Boundary Object](BoundaryObject.png)


### Entity Objects (Information)

Contains the information required that needs to be passed across the objects.

![Boundary Object](EntityObject.png)

### Control Objects (Behaviour)

Decides the behaviour of the system overall.

![Boundary Object](ControlObject.png)

## Identifying Objects

### Identifying Boundary Objects

#### Types of Boundary Objects
- Interacts with a user.
- Interacts with another system.

#### Strategies
- Always start with the actors and identify the objects that they interact with directly. 
- Observe the flow of events of the use cases. From these events, you can identify the functionalities that are most likely covered by an interface.
- Sometimes it is specified in the System Interface Description or anywhere within the Requirements model.

##### Actors
Each actor will need an interface to interact with the system.

##### Flow of events
Flow of events in your Use Case Realization Report can help you identify your boundary objects.


### Identifying Entity Objects

Entity Objects are often found in the Domain Object Model.

#### Strategies
- Find out what information is needed.
- Look closely at the flow events and find any form of data or information that is being passed, updated and used across your system.

### Identifying Control Objects

Control Objects are usually the last objects to identify. Any behaviour that can't be classified as either Boundary or Entity will usually fall under Control Objects.

Control Objects can also behave as a glue that connects the other objects of the system together.

#### Typical behaviours
- Transaction-related
- Coordination-related
- Sequence-specific to one or more use cases

#### Strategies
- For every use case, there is usually one Control Object.
- Exceptions are when 
 - Control object appears in another use case.
 - Behaviour is complex that it needs more than one control object.
 - Explicitly specified by the use case.

 


